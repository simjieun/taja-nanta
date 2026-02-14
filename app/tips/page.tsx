import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '타자 속도 향상 팁 - 타자난타',
  description: '타자 속도(WPM)와 정확도를 빠르게 향상시키는 방법을 알아보세요. 올바른 자세, 손가락 위치, 연습 방법 등 타자 실력 향상을 위한 모든 팁을 제공합니다.',
}

export default function TipsPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* 헤더 */}
      <section className="text-center space-y-3">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          타자 실력 향상 완벽 가이드
        </h2>
        <p className="text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
          분당 타수(타/분)와 정확도를 높이기 위한 검증된 방법들을 소개합니다.
          올바른 습관을 기르면 누구든 빠른 타자를 칠 수 있습니다.
        </p>
      </section>

      {/* WPM 기준 */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          타자 속도 기준표
        </h3>
        <p className="text-gray-600 dark:text-white/60 text-sm">
          한국어 타자 속도는 분당 타수(타/분)로 측정합니다. 아래 표를 참고해 현재 자신의 수준을 확인하세요.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-emerald-50 dark:bg-emerald-950/30">
                <th className="text-left p-3 font-bold text-gray-800 dark:text-white border border-gray-200 dark:border-neutral-700 rounded-tl-lg">수준</th>
                <th className="text-left p-3 font-bold text-gray-800 dark:text-white border border-gray-200 dark:border-neutral-700">타자 속도</th>
                <th className="text-left p-3 font-bold text-gray-800 dark:text-white border border-gray-200 dark:border-neutral-700 rounded-tr-lg">설명</th>
              </tr>
            </thead>
            <tbody>
              {[
                { level: '입문', speed: '100타/분 미만', desc: '독수리 타법 단계. 손가락을 보며 치는 경우가 많습니다.' },
                { level: '초급', speed: '100~200타/분', desc: '기본기를 익히는 단계. 주로 검지 위주로 타이핑합니다.' },
                { level: '중급', speed: '200~300타/분', desc: '대부분의 직장인이 해당하는 수준입니다.' },
                { level: '고급', speed: '300~400타/분', desc: '10손가락을 고루 사용하며 유창하게 타이핑합니다.' },
                { level: '전문가', speed: '400타/분 이상', desc: '키보드를 보지 않고도 빠르게 칩니다. 속기사 수준입니다.' },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-gray-50 dark:bg-neutral-800/50'}>
                  <td className="p-3 font-medium text-emerald-700 dark:text-emerald-400 border border-gray-200 dark:border-neutral-700">{row.level}</td>
                  <td className="p-3 font-mono text-gray-800 dark:text-white border border-gray-200 dark:border-neutral-700">{row.speed}</td>
                  <td className="p-3 text-gray-600 dark:text-white/60 text-sm border border-gray-200 dark:border-neutral-700">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 dark:text-white/40">
          * 타자난타에서는 WPM(Words Per Minute) 방식으로 측정됩니다. 1 WPM = 약 5타에 해당합니다.
        </p>
      </section>

      {/* 올바른 자세 */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          올바른 타이핑 자세
        </h3>
        <p className="text-gray-600 dark:text-white/60 text-sm">
          올바른 자세는 타자 속도 향상뿐 아니라 장기적인 건강을 위해서도 중요합니다.
        </p>
        <div className="space-y-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-800 space-y-3">
            <h4 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="text-emerald-500">①</span> 의자와 모니터 위치
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60 list-none">
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span>등을 의자 등받이에 밀착시키고 허리를 똑바로 세웁니다</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span>모니터 상단이 눈높이와 같거나 약간 낮은 위치에 오도록 합니다</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span>모니터와의 거리는 팔을 뻗었을 때 손이 닿는 거리(약 50~70cm)가 적당합니다</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span>발은 바닥에 평평하게 놓고, 무릎이 90도 각도를 이루도록 합니다</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-800 space-y-3">
            <h4 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="text-emerald-500">②</span> 손과 손목 위치
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60 list-none">
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span>손목이 키보드 위에 닿지 않도록 살짝 들어올립니다 (손목 터널 증후군 예방)</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span>손가락은 자연스럽게 구부린 상태로 키를 누릅니다</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span>팔꿈치가 90도 이상 구부러지지 않도록 키보드 위치를 조정합니다</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span>장시간 타이핑 시 5~10분마다 손목 스트레칭을 합니다</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 홈 포지션 */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          홈 포지션 (Home Row Position)
        </h3>
        <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
          홈 포지션은 타자 연습의 기본입니다. 타이핑하지 않을 때 손가락이 항상 돌아와야 하는 기본 위치입니다.
          대부분의 타자 속도 향상은 올바른 홈 포지션 습관에서 시작됩니다.
        </p>
        <div className="bg-gray-900 dark:bg-black rounded-xl p-6 font-mono text-center space-y-3 border border-gray-700">
          <div className="text-gray-400 text-sm">키보드 홈 행 (Home Row)</div>
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'].map((key, i) => (
              <div
                key={key}
                className={`w-10 h-10 rounded flex items-center justify-center font-bold text-sm border-2 ${
                  ['F', 'J'].includes(key)
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : 'bg-gray-800 text-gray-300 border-gray-600'
                }`}
              >
                {key}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs mt-2">
            <div className="text-left space-y-1">
              <div className="text-emerald-400 font-medium">왼손 홈 포지션</div>
              <div className="text-gray-400">새끼손가락 → A</div>
              <div className="text-gray-400">약지 → S</div>
              <div className="text-gray-400">중지 → D</div>
              <div className="text-gray-400 font-medium text-emerald-300">검지 → F (돌기 확인)</div>
            </div>
            <div className="text-left space-y-1">
              <div className="text-emerald-400 font-medium">오른손 홈 포지션</div>
              <div className="text-gray-400 font-medium text-emerald-300">검지 → J (돌기 확인)</div>
              <div className="text-gray-400">중지 → K</div>
              <div className="text-gray-400">약지 → L</div>
              <div className="text-gray-400">새끼손가락 → ;</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-white/50">
          F와 J 키에는 손으로 만질 수 있는 작은 돌기가 있습니다. 눈을 감고도 홈 포지션을 찾을 수 있도록 연습하세요.
        </p>
      </section>

      {/* 단계별 연습 방법 */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          단계별 실력 향상 방법
        </h3>
        <div className="space-y-4">
          {[
            {
              step: 1,
              title: '정확도 우선 연습 (1~2주)',
              content: '처음에는 속도를 전혀 신경 쓰지 말고 정확도 100%를 목표로 연습하세요. 느리더라도 모든 손가락을 사용하고, 올바른 손가락으로 올바른 키를 누르는 습관을 만드는 것이 우선입니다. 틀린 글자가 나오면 반드시 수정하면서 진행하세요.',
            },
            {
              step: 2,
              title: '속도 향상 연습 (2~4주)',
              content: '정확도 95% 이상이 안정되면 속도를 서서히 올리세요. 매일 어제보다 5%씩 속도를 높이는 것을 목표로 합니다. 타자난타의 타이머와 WPM 표시를 활용해 자신의 속도를 추적하세요.',
            },
            {
              step: 3,
              title: '약한 손가락 집중 훈련 (상시)',
              content: '대부분의 사람들은 약지와 새끼손가락이 약합니다. A, S, L, ; 등 홈 행의 양쪽 끝 키들을 의식적으로 연습하세요. 약한 손가락이 강해질수록 전체 타자 속도가 균형 있게 향상됩니다.',
            },
            {
              step: 4,
              title: '시선 훈련 (1개월 이후)',
              content: '키보드를 보지 않고 화면만 보며 타이핑하는 훈련을 시작하세요. 처음에는 속도가 많이 떨어지지만, 2~3주 꾸준히 하면 오히려 이전보다 빠른 속도를 달성할 수 있습니다. 키보드를 보지 않는 것이 최고 속도 달성의 핵심입니다.',
            },
            {
              step: 5,
              title: '일상화 (꾸준히)',
              content: '하루 10~15분씩 꾸준히 연습하는 것이 가장 효과적입니다. 타자난타의 일일 500자 목표를 활용해 매일 꾸준한 연습 습관을 만드세요. 3개월 꾸준히 하면 타자 속도가 2배 이상 향상됩니다.',
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 bg-white dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-800">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-lg shrink-0">
                {item.step}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 자주 묻는 질문 */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          자주 묻는 질문 (FAQ)
        </h3>
        <div className="space-y-3">
          {[
            {
              q: '타자 연습을 얼마나 해야 속도가 늘어나나요?',
              a: '개인차가 있지만, 매일 10~15분씩 꾸준히 연습하면 보통 4~8주 안에 눈에 띄는 향상을 경험합니다. 중요한 것은 양보다 꾸준함입니다.',
            },
            {
              q: '손가락이 꼬이는 느낌이 드는데 정상인가요?',
              a: '처음에는 자연스러운 현상입니다. 특히 약지와 새끼손가락이 잘 움직이지 않는 것은 운동 부족 때문입니다. 꾸준히 연습하면 점점 자연스러워집니다.',
            },
            {
              q: '영문 타자와 한글 타자 중 어떤 것을 먼저 연습해야 하나요?',
              a: '기본 원리는 같습니다. 업무에서 더 많이 사용하는 것부터 시작하세요. 한국어를 주로 쓰는 직장인이라면 한글 타자를, 개발자나 영문 작업이 많다면 영문 타자를 먼저 익히는 것이 효율적입니다.',
            },
            {
              q: '나이가 많으면 타자 연습이 더 어렵나요?',
              a: '나이와 타자 학습 능력은 크게 관계없습니다. 다만 어릴수록 새로운 습관 형성이 조금 빠를 수 있습니다. 하지만 꾸준한 연습 의지가 있다면 나이에 상관없이 충분히 향상됩니다.',
            },
            {
              q: '손목이 자주 아픈데 어떻게 해야 하나요?',
              a: '손목 통증이 느껴지면 즉시 휴식을 취하세요. 타이핑 중 손목을 키보드에 붙이지 않는 것이 중요합니다. 손목 받침대(wrist rest)를 사용하거나, 손목 스트레칭을 자주 해주세요. 지속적인 통증은 전문 의료인에게 상담하세요.',
            },
          ].map((faq, i) => (
            <details key={i} className="group bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                <span className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">Q.</span>
                  {faq.q}
                </span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-4 pb-4 pt-0">
                <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed border-t border-gray-100 dark:border-neutral-700 pt-3">
                  <span className="text-emerald-500 font-bold mr-1">A.</span>
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          이론은 충분히 배웠으니, 이제 실전!
        </h3>
        <p className="text-gray-600 dark:text-white/60">
          타자난타에서 지금 바로 연습을 시작해보세요.
          직장인 공감 문구들로 재미있게 타자 실력을 키울 수 있습니다.
        </p>
        <Link
          href="/practice"
          className="inline-block px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-all"
        >
          타자연습 시작하기 →
        </Link>
      </section>
    </div>
  )
}
