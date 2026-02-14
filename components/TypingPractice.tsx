'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

interface TypingPracticeProps {
  text: string
  onComplete: (wpm: number, accuracy: number, duration: number) => void
  onNext?: () => void
}

export default function TypingPractice({ text, onComplete, onNext }: TypingPracticeProps) {
  // 문장 단위로 텍스트 분리 후, 긴 줄은 문자 길이 기준으로 추가 분리
  const lines = useMemo(() => {
    const MAX_LINE_LENGTH = 50

    // 1단계: ". " 기준으로 문장 분리
    const sentences = text.split('. ')
    const sentenceLines = sentences
      .map((part, i) => (i < sentences.length - 1 ? `${part}.` : part))
      .filter(part => part.length > 0)

    // 2단계: 긴 문장은 자연스러운 구분점(", " 또는 " ")에서 추가 분리
    return sentenceLines.flatMap(line => {
      if (line.length <= MAX_LINE_LENGTH) return [line]

      const result: string[] = []
      let remaining = line

      while (remaining.length > MAX_LINE_LENGTH) {
        const commaIdx = remaining.lastIndexOf(', ', MAX_LINE_LENGTH - 1)
        const spaceIdx = remaining.lastIndexOf(' ', MAX_LINE_LENGTH - 1)

        let splitIdx: number
        if (commaIdx > 0) {
          splitIdx = commaIdx + 2 // ", " 뒤에서 분리
        } else if (spaceIdx > 0) {
          splitIdx = spaceIdx + 1 // " " 뒤에서 분리
        } else {
          splitIdx = MAX_LINE_LENGTH // 구분점 없으면 강제 분리
        }

        result.push(remaining.slice(0, splitIdx).trimEnd())
        remaining = remaining.slice(splitIdx)
      }

      if (remaining.length > 0) {
        result.push(remaining)
      }

      return result
    })
  }, [text])

  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [input, setInput] = useState('')
  const [completedInputs, setCompletedInputs] = useState<string[]>([])
  const [startTime, setStartTime] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentLine = lines[currentLineIndex] ?? ''
  const isLastLine = currentLineIndex >= lines.length - 1
  const isCurrentLineFull = input.length >= currentLine.length

  // text가 변경될 때마다 상태 초기화
  useEffect(() => {
    setCurrentLineIndex(0)
    setInput('')
    setCompletedInputs([])
    setStartTime(null)
    setIsComplete(false)
    setWpm(0)
    setAccuracy(100)
    // DOM 업데이트 후 포커스 (disabled 해제 반영 대기)
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [text])

  // 완료 후 전역 키 이벤트로 다음 문장 이동
  useEffect(() => {
    if (!isComplete) return

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        // 리스너를 먼저 제거한 후 onNext 호출 (중복 호출 방지)
        window.removeEventListener('keydown', handleGlobalKeyDown)
        onNext?.()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isComplete, onNext])

  // 전체 정확도 계산
  const calculateOverallAccuracy = (allCompletedInputs: string[], currentInput: string, currentIdx: number) => {
    let totalChars = 0
    let correctChars = 0

    allCompletedInputs.forEach((lineInput, idx) => {
      const line = lines[idx]
      for (let i = 0; i < lineInput.length; i++) {
        totalChars++
        if (lineInput[i] === line[i]) correctChars++
      }
    })

    const line = lines[currentIdx]
    if (line) {
      for (let i = 0; i < currentInput.length; i++) {
        totalChars++
        if (currentInput[i] === line[i]) correctChars++
      }
    }

    return totalChars > 0 ? (correctChars / totalChars) * 100 : 100
  }

  // 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (!startTime) {
      setStartTime(Date.now())
    }

    setInput(value)

    // 정확도 계산
    const currentAccuracy = calculateOverallAccuracy(completedInputs, value, currentLineIndex)
    setAccuracy(Math.round(currentAccuracy * 100) / 100)

    // 마지막 줄까지 입력 완료 체크
    if (value.length >= currentLine.length && isLastLine) {
      const endTime = Date.now()
      const duration = (endTime - startTime!) / 1000
      const minutes = duration / 60
      const totalChars = lines.reduce((sum, l) => sum + l.length, 0)
      const words = totalChars / 5
      const calculatedWpm = Math.round(words / minutes)

      setWpm(calculatedWpm)
      setIsComplete(true)
      onComplete(calculatedWpm, currentAccuracy, Math.round(duration))
    }
  }

  // 키보드 이벤트 처리 (스페이스바, 엔터키로 다음 줄 이동)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isCurrentLineFull && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault()
      if (!isLastLine) {
        setCompletedInputs(prev => [...prev, input])
        setCurrentLineIndex(prev => prev + 1)
        setInput('')
        inputRef.current?.focus()
      }
    }
  }

  // 진행률 계산
  const completedChars = completedInputs.reduce((sum, inp) => sum + inp.length, 0)
  const totalChars = lines.reduce((sum, l) => sum + l.length, 0)
  const progress = totalChars > 0 ? ((completedChars + input.length) / totalChars) * 100 : 0

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      {/* CRT 모니터 프레임 */}
      <div className="crt-frame">
        {/* 모니터 상단 브랜드 */}
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-500" style={{ fontFamily: "'Courier New', monospace" }}>
            TAJA-NANTA CRT-9000
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-600" style={{ fontFamily: "'Courier New', monospace" }}>PWR</span>
            <div className="crt-power-led" />
          </div>
        </div>

        {/* CRT 화면 */}
        <div className="crt-screen crt-scanlines crt-flicker retro-boot">
          <div className="p-6 sm:p-8">
            {/* 상단 상태 바 */}
            <div className="flex items-center justify-between mb-1 pb-2 border-b border-[#2a5a2a]" style={{ fontFamily: "'Courier New', monospace" }}>
              <span className="retro-text-dim text-xs">
                {lines.length > 1
                  ? `LINE ${currentLineIndex + 1}/${lines.length}`
                  : 'READY'
                }
              </span>
              <span className="retro-text-dim text-xs">
                {Math.round(progress)}% COMPLETE
              </span>
            </div>

            {/* 진행률 바 */}
            <div className="retro-progress-track h-1.5 rounded-none mb-6">
              <div
                className="retro-progress-bar h-full rounded-none"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            {/* 텍스트 표시 (터미널 스타일) */}
            <div className="text-xl sm:text-2xl leading-relaxed mb-6 space-y-1" style={{ fontFamily: "'Courier New', 'Noto Sans KR', monospace" }}>
              {lines.map((line, lineIdx) => (
                <div
                  key={lineIdx}
                  className={`py-1 px-2 -mx-2 rounded transition-colors ${
                    lineIdx === currentLineIndex
                      ? 'bg-[#0a2a0a]'
                      : ''
                  }`}
                >
                  {/* 줄 번호 프롬프트 */}
                  <span className="retro-text-dim text-sm mr-2 select-none">
                    {lineIdx === currentLineIndex ? '>' : ' '}
                  </span>
                  {line.split('').map((char, charIdx) => {
                    let colorClass = 'retro-text-dim'

                    if (lineIdx < currentLineIndex) {
                      const lineInput = completedInputs[lineIdx] ?? ''
                      colorClass = lineInput[charIdx] === char
                        ? 'retro-text-glow'
                        : 'retro-text-error'
                    } else if (lineIdx === currentLineIndex && charIdx < input.length) {
                      colorClass = input[charIdx] === char
                        ? 'retro-text-glow'
                        : 'retro-text-error'
                    }

                    return (
                      <span key={charIdx} className={colorClass}>
                        {char}
                      </span>
                    )
                  })}
                  {/* 블링킹 커서 - 현재 줄의 입력 위치에 표시 */}
                  {lineIdx === currentLineIndex && !isComplete && (
                    <span className="retro-cursor ml-px" />
                  )}
                </div>
              ))}
            </div>

            {/* 입력 필드 */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 retro-text-glow text-sm select-none" style={{ fontFamily: "'Courier New', monospace" }}>
                $&gt;
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                maxLength={currentLine.length}
                disabled={isComplete}
                className="retro-input w-full pl-10 pr-4 py-3.5 text-lg rounded"
                placeholder="여기에 타이핑하세요..."
                style={{ fontFamily: "'Courier New', 'Noto Sans KR', monospace" }}
              />
            </div>

            {/* 힌트 */}
            <div className="mt-3 flex justify-between items-center text-xs" style={{ fontFamily: "'Courier New', monospace" }}>
              <span className="retro-text-amber">
                {isCurrentLineFull && !isComplete && !isLastLine &&
                  '[ENTER] 또는 [SPACE] >> 다음 줄'
                }
                {isCurrentLineFull && !isComplete && isLastLine &&
                  '[ENTER] 또는 [SPACE] >> 완료'
                }
                {!isCurrentLineFull && !isComplete && '\u00A0'}
              </span>
              <span className="retro-text-dim">
                {input.length}/{currentLine.length}
              </span>
            </div>
          </div>
        </div>

        {/* 모니터 하단 */}
        <div className="flex justify-center mt-3">
          <div className="w-20 h-1 bg-neutral-700 rounded-full" />
        </div>
      </div>

      {/* 통계 (아케이드 스코어보드 스타일) */}
      <div className="grid grid-cols-3 gap-3">
        <div className="retro-stat-card p-4 text-center">
          <div className="text-xs retro-text-dim mb-1" style={{ fontFamily: "'Courier New', monospace", letterSpacing: '0.15em' }}>SPEED</div>
          <div className="text-3xl font-bold retro-text-glow" style={{ fontFamily: "'Courier New', monospace" }}>{String(wpm).padStart(3, '0')}</div>
          <div className="text-xs retro-text-dim mt-1" style={{ fontFamily: "'Courier New', monospace" }}>WPM</div>
        </div>
        <div className="retro-stat-card p-4 text-center">
          <div className="text-xs retro-text-dim mb-1" style={{ fontFamily: "'Courier New', monospace", letterSpacing: '0.15em' }}>ACCURACY</div>
          <div className="text-3xl font-bold retro-text-amber" style={{ fontFamily: "'Courier New', monospace" }}>{accuracy.toFixed(1)}</div>
          <div className="text-xs retro-text-dim mt-1" style={{ fontFamily: "'Courier New', monospace" }}>%</div>
        </div>
        <div className="retro-stat-card p-4 text-center">
          <div className="text-xs retro-text-dim mb-1" style={{ fontFamily: "'Courier New', monospace", letterSpacing: '0.15em' }}>PROGRESS</div>
          <div className="text-3xl font-bold retro-text-glow" style={{ fontFamily: "'Courier New', monospace" }}>{String(Math.round(progress)).padStart(3, '0')}</div>
          <div className="text-xs retro-text-dim mt-1" style={{ fontFamily: "'Courier New', monospace" }}>%</div>
        </div>
      </div>

      {/* 완료 메시지 */}
      {isComplete && (
        <div className="crt-screen retro-complete p-6 text-center" style={{ fontFamily: "'Courier New', 'Noto Sans KR', monospace" }}>
          <div className="text-2xl font-bold retro-text-glow mb-2">
            *** MISSION COMPLETE ***
          </div>
          <div className="retro-text-amber text-sm mb-3">
            스트레스를 성공적으로 날려버렸습니다!
          </div>
          <div className="retro-text-dim text-xs">
            [SPACE] 또는 [ENTER] &gt;&gt; 다음 미션
          </div>
        </div>
      )}
    </div>
  )
}
