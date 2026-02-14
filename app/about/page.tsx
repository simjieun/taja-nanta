import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '타자난타 소개 - 직장인 힐링 타자연습 플랫폼',
  description: '타자난타는 직장인의 스트레스를 타자연습으로 해소하는 힐링 플랫폼입니다. 레트로 CRT 디자인, 레벨 시스템, 직장인 공감 문구로 재미있게 타자 실력을 키우세요.',
}

export default function AboutPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* 헤더 */}
      <section className="text-center space-y-4">
        <div className="text-6xl">⚡</div>
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          타자난타 소개
        </h2>
        <p className="text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
          직장인의 스트레스를 타자연습으로 날려버리는 힐링 플랫폼
        </p>
      </section>

      {/* 서비스 배경 */}
      <section className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl p-8 space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          타자난타를 만든 이유
        </h3>
        <div className="space-y-3 text-gray-700 dark:text-white/80 leading-relaxed">
          <p>
            직장 생활을 하다 보면 말하지 못하는 감정들이 쌓입니다. 부당한 업무 지시, 이해할 수 없는 상사, 야근, 회의, 보고서...
            매일 반복되는 스트레스 속에서 많은 직장인들이 지쳐가고 있습니다.
          </p>
          <p>
            타자난타는 그런 직장인들을 위해 만들어졌습니다. 직장 생활의 현실을 솔직하게 담은 문구들을 타이핑하면서
            카타르시스를 느끼고, 동시에 실용적인 타자 실력도 키울 수 있는 공간입니다.
          </p>
          <p>
            키보드를 세게 두드릴수록 스트레스가 풀린다는 걸 알고 계셨나요?
            타자난타에서 마음껏 두드려보세요. 판단하는 사람은 아무도 없습니다.
          </p>
        </div>
      </section>

      {/* 주요 특징 */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          타자난타의 특징
        </h3>
        <div className="space-y-4">
          <div className="flex gap-4 p-5 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800">
            <div className="text-3xl shrink-0">🖥️</div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-1">레트로 CRT 모니터 디자인</h4>
              <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
                1980~90년대 CRT 모니터를 재현한 레트로 디자인으로 타자연습 화면을 구성했습니다.
                스캔라인 효과, 화면 부팅 애니메이션, 인광 초록색 텍스트 등으로 복고 감성을 자아냅니다.
                단순히 예쁜 것을 넘어, 집중력을 높이는 환경을 제공합니다.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800">
            <div className="text-3xl shrink-0">😤</div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-1">직장인 공감 문구 65개+</h4>
              <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
                직장공감, 힐링, 퇴사, 동기부여 4가지 카테고리의 문구 65개가 기본으로 제공됩니다.
                야근, 상사, 보고서, 회의 등 직장인이라면 누구나 공감할 수 있는 현실적인 이야기들입니다.
                나만의 문구도 직접 추가해서 사용할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800">
            <div className="text-3xl shrink-0">🏆</div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-1">8단계 레벨 성장 시스템</h4>
              <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
                신입 퇴사러 → 주니어 퇴사러 → 시니어 퇴사러 → 팀장 퇴사러 → 임원 퇴사러 →
                프로 퇴사러 → 레전드 퇴사러 → 퇴사의 신으로 이어지는 8단계 레벨 시스템.
                타자를 칠수록 레벨이 올라가 꾸준한 연습 동기를 제공합니다.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800">
            <div className="text-3xl shrink-0">📊</div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-1">실시간 WPM & 통계 분석</h4>
              <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
                타자연습 중 실시간으로 WPM(분당 단어 수)과 정확도를 측정합니다.
                각 문자별로 정확도가 색상으로 표시되어(초록=정확, 빨강=오류) 즉각적인 피드백을 받을 수 있습니다.
                누적 통계를 통해 자신의 성장 과정을 한눈에 확인하세요.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800">
            <div className="text-3xl shrink-0">🔒</div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-1">회원가입 불필요 · 완전 무료</h4>
              <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
                별도의 회원가입이나 로그인 없이 즉시 사용할 수 있습니다.
                모든 데이터는 브라우저의 로컬 스토리지에 저장되므로 개인정보 걱정 없이 이용할 수 있습니다.
                완전 무료로 제공되는 서비스입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 사용 대상 */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          이런 분들께 추천합니다
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { emoji: '💼', text: '직장 스트레스를 건강하게 해소하고 싶은 직장인' },
            { emoji: '⌨️', text: '타자 속도와 정확도를 향상시키고 싶은 분' },
            { emoji: '📝', text: '문서 작성 업무가 많아 타이핑 효율을 높이고 싶은 분' },
            { emoji: '🎮', text: '레트로 감성의 독특한 타자연습을 원하는 분' },
            { emoji: '🌱', text: '매일 꾸준한 습관을 만들고 싶은 분' },
            { emoji: '🚪', text: '퇴사를 꿈꾸며 현실을 타이핑으로 풀고 싶은 분' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800">
              <span className="text-2xl">{item.emoji}</span>
              <p className="text-gray-700 dark:text-white/80 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 개발자 소개 */}
      <section className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-8 space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          만든 사람
        </h3>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-3xl shrink-0">
            👩‍💻
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-gray-800 dark:text-white text-lg">심Joyful</h4>
            <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
              직장인들의 일상에 조금이나마 즐거움과 위로를 드리고 싶어 타자난타를 만들었습니다.
              타자를 치면서 스트레스도 풀고, 실력도 키우는 일석이조의 경험을 드리고 싶습니다.
              오늘 하루도 정말 수고하셨습니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4 pb-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          지금 바로 시작해보세요
        </h3>
        <p className="text-gray-600 dark:text-white/60">
          회원가입 없이, 무료로, 지금 바로 시작할 수 있습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/practice"
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all"
          >
            타자연습 시작하기 →
          </Link>
          <Link
            href="/tips"
            className="px-8 py-3 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-800 dark:text-white rounded-xl font-bold transition-all"
          >
            타자 팁 보기
          </Link>
        </div>
      </section>
    </div>
  )
}
