'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [isStarting, setIsStarting] = useState(false)

  const handleStart = () => {
    setIsStarting(true)
    setTimeout(() => {
      router.push('/practice')
    }, 400)
  }

  return (
    <div className="flex-1 flex flex-col space-y-16">
      {/* 히어로 섹션 */}
      <section className="flex flex-col items-center justify-center space-y-8 pt-8">
        <div className="fade-in-up flex flex-col items-center space-y-10">
          <div className="text-center space-y-4">
            <div className="keyboard-icon text-6xl mb-4">
              &#x2328;&#xFE0F;
            </div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
              타자로 스트레스를 날려버리세요
            </h2>
            <p className="text-lg text-gray-500 dark:text-white/60 max-w-xl mx-auto leading-relaxed">
              직장인의 마음을 이해하는 힐링 타자연습 플랫폼.<br />
              하루의 스트레스를 키보드로 풀어내고, 타자 실력도 함께 키우세요.
            </p>
          </div>

          <button
            onClick={handleStart}
            disabled={isStarting}
            className={`
              btn-start btn-start-wrapper
              relative px-14 py-5 rounded-2xl
              text-white text-xl font-bold tracking-wide
              cursor-pointer select-none
              disabled:opacity-70 disabled:cursor-not-allowed
              ${isStarting ? 'scale-95 opacity-80' : ''}
            `}
          >
            <span className="relative z-10 flex items-center gap-3">
              {isStarting ? (
                <>
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  준비 중...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                  </svg>
                  지금 바로 시작하기
                </>
              )}
            </span>
          </button>

          <p className="text-sm text-gray-400 dark:text-white/40">
            회원가입 없이 무료로 이용할 수 있습니다
          </p>
        </div>
      </section>

      {/* 서비스 소개 섹션 */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            타자난타란?
          </h3>
          <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
            타자난타는 직장인들의 일상적인 스트레스를 타자연습으로 해소하는 힐링 플랫폼입니다.
            직장 생활에서 느끼는 감정을 담은 문구들을 타이핑하며 카타르시스를 느끼고,
            동시에 타자 속도(WPM)와 정확도를 향상시킬 수 있습니다.
            레트로 CRT 모니터 디자인으로 옛날 컴퓨터의 감성을 느끼며
            오늘 하루의 스트레스를 시원하게 날려버리세요.
          </p>
        </div>
      </section>

      {/* 기능 소개 카드 */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
          주요 기능
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">🖥️</div>
            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">레트로 CRT 타자연습</h4>
            <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
              복고풍 CRT 모니터 디자인의 타자연습 화면에서 실시간 WPM과 정확도를 확인하며 연습합니다.
              문자별로 정확도가 색상으로 표시되어 즉각적인 피드백을 받을 수 있습니다.
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">😤</div>
            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">직장인 공감 문구</h4>
            <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
              상사 잔소리, 야근, 월요병 등 직장인이라면 공감할 수밖에 없는 현실적인 문구들로
              타자연습을 하며 카타르시스를 느낄 수 있습니다. 나만의 문구도 추가할 수 있습니다.
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">🏆</div>
            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">레벨 & 업적 시스템</h4>
            <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
              타자를 치면 칠수록 레벨이 올라갑니다. 신입 퇴사러에서 시작해
              퇴사의 신까지 8단계 성장 시스템으로 꾸준한 연습 동기를 제공합니다.
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">상세 통계 분석</h4>
            <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
              평균 WPM, 정확도, 총 연습 시간, 타자 수 등 다양한 통계를 확인할 수 있습니다.
              연습 히스토리를 통해 실력 향상 과정을 추적하세요.
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">일일 목표 달성</h4>
            <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
              하루 500자 목표를 설정하고 꾸준히 타자연습을 할 수 있습니다.
              매일 조금씩 연습하면 타자 속도가 눈에 띄게 향상됩니다.
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">✏️</div>
            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">나만의 문구 등록</h4>
            <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
              직접 타이핑하고 싶은 문구를 등록할 수 있습니다.
              하고 싶은 말, 좋아하는 명언, 업무 중 떠오른 생각을 문구로 만들어 연습하세요.
            </p>
          </div>
        </div>
      </section>

      {/* 사용 방법 섹션 */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
          이렇게 사용해요
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-lg">
              1
            </div>
            <h4 className="font-bold text-gray-800 dark:text-white">시작하기 버튼 클릭</h4>
            <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">
              회원가입 없이 바로 시작할 수 있습니다.
              랜덤으로 선정된 문구가 레트로 화면에 나타납니다.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-lg">
              2
            </div>
            <h4 className="font-bold text-gray-800 dark:text-white">문구 타이핑</h4>
            <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">
              화면에 나타난 문구를 그대로 타이핑하세요.
              실시간으로 WPM과 정확도가 측정됩니다.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-lg">
              3
            </div>
            <h4 className="font-bold text-gray-800 dark:text-white">결과 확인 & 공유</h4>
            <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">
              연습이 끝나면 결과를 확인하고 SNS에 공유할 수 있습니다.
              통계 페이지에서 성장 과정을 추적하세요.
            </p>
          </div>
        </div>
      </section>

      {/* 타자연습 효과 섹션 */}
      <section className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl p-8 space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
          타자연습, 왜 해야 할까요?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 text-xl mt-0.5">✓</span>
              <div>
                <strong className="text-gray-800 dark:text-white">업무 생산성 향상</strong>
                <p className="text-sm text-gray-600 dark:text-white/60 mt-1">
                  평균 직장인의 타자 속도는 분당 200~300타 수준입니다.
                  꾸준한 연습으로 500타 이상을 달성하면 문서 작성 속도가 2배 이상 빨라집니다.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 text-xl mt-0.5">✓</span>
              <div>
                <strong className="text-gray-800 dark:text-white">집중력 및 인지 능력 향상</strong>
                <p className="text-sm text-gray-600 dark:text-white/60 mt-1">
                  타자연습은 손가락과 뇌의 협응 능력을 향상시킵니다.
                  규칙적인 타자연습은 집중력과 기억력 향상에도 도움이 됩니다.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 text-xl mt-0.5">✓</span>
              <div>
                <strong className="text-gray-800 dark:text-white">스트레스 해소</strong>
                <p className="text-sm text-gray-600 dark:text-white/60 mt-1">
                  키보드를 두드리는 행위 자체가 스트레스를 해소하는 효과가 있습니다.
                  공감 문구를 타이핑하며 감정적 카타르시스를 경험하세요.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 text-xl mt-0.5">✓</span>
              <div>
                <strong className="text-gray-800 dark:text-white">자세 교정 & 피로 감소</strong>
                <p className="text-sm text-gray-600 dark:text-white/60 mt-1">
                  올바른 타자 습관을 기르면 손목 피로와 어깨 통증을 줄일 수 있습니다.
                  <Link href="/tips" className="text-emerald-600 dark:text-emerald-400 underline ml-1">
                    올바른 타자 자세 보러가기
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="flex flex-col items-center text-center space-y-4 pb-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          오늘 하루도 수고했습니다
        </h3>
        <p className="text-gray-600 dark:text-white/60 max-w-md">
          지금 바로 타자난타를 시작하고 스트레스를 날려버리세요.
          단 5분의 연습이 당신의 하루를 바꿉니다.
        </p>
        <button
          onClick={handleStart}
          disabled={isStarting}
          className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-all disabled:opacity-70"
        >
          타자연습 시작하기 →
        </button>
      </section>
    </div>
  )
}
