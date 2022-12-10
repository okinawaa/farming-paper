import type { Question } from "../types";

/**
 *
 * 추가할 키워드
 * 전수조사, 표본조사, 표준오차, 신뢰구간, 편향, 표본추출법, 단순임의추출법
 * 비확률추출법 자세한 것.
 * 모비율 추정량 \hat{p} 계산방법 95% 표본의 크기 역계산
 * 단순임의추출법, 비편향추정량, 회귀추정, 비추정, 보조변수, 주변수, 모평균 회귀추정량 표본평균
 * 선형관계, 보조변수로 이용한 비추정량 계산
 * 오차의 한계 계산법
 * 표본의 크기를 200개 늘리고, 네이만배분. 배분법
 * 사후층화법 과대추정 과소추정
 * 표준오차 계산법
 * 순환모집단, 게통추출법, 순서모집단, 랜덤모집단
 * 집락추출법, 설계효과
 * 추출틀, 1차추출단위, 2차추출단위
 * 확률비례게통추출법
 * 편향
 * 항목 무응답의 대체 방법. 평균대체 회귀대체 최근방대체 핫덱대체
 * 표본오차 설명 무응답오차 응답오차 우연오차
 * 폐쇄형질문 개방형질문 중복부차표본기법 민감한것
 * 추출틀
 *
 *
 */

export const questions: Question[] = [
  {
    type: "short_order",
    message: "$\\sqrt{E\\{\\bar{y}-E(\\bar{y})\\}^2}$ : 표본평균의 ___",
    correct: ["표준오차"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: "비표본오차의 종류 : ___ 오차, ___ 오차, ___ 중의 오차",
    correct: ["무응답", "응답", "자료처리과정"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: "우연오차는 크게 ___ 오차와 ___ 오차로 나뉜다.",
    correct: ["표본", "비표본"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: "___ : 비확률변수의 특성. 일종의 체계적인 오차. ___ 을 갖는다.",
    correct: ["편향", "방향성"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "표본편향 - 발생 원인에 따라___ 편향, ___ 편향(일치추정량이지만 편향추정량을 사용할 때 발생), ___ 통계적 편향(추정법에서 기인한 편향. 예: 중앙값)으로 구분한다.",
    correct: ["추출틀", "일치성", "상수성"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "___ 를 점검하는 방법: 일관성 점검, 사후표본조사 점검, 중복부차표본 기법, 외부기록 점검 등",
    correct: ["비표본오차"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "사후표본조사는 기억 오류를 방지하기 위해 본 조사를 마친 ___ 후가 적당.",
    correct: ["2주"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "마약복용 여부, 세금 탈루 여부 등과 같은 민감한사안에 대한 조사는 직접 질문하는 것보다 ___ 기법을 사용하는 것이 바람직하다.",
    correct: ["확률화응답"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "___ 대체: 무응답자와 응답자 간의 특성이 유사하다는 가성을 사용한다. 동일 층에 무응답자가 많은 경우 표본분포가 왜곡될 수 있음. 추정량 ___ 을 과소 추정하는 경향이 있으므로 주의.",
    correct: ["평균", "분산"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "___ 대체: 일정한 기준으로 정렬한 경우 최근방 조사단위의 특성이 유사하다는 전제로 사용함. 무응답이 많을 때 모평균이나 모분산추정에 편향 발생.",
    correct: ["최근방"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: "___ 대체: 선형회귀모형을 통해 무응답을 대체하는 방법. ",
    correct: ["회귀"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "___ 대체: 무응답 대체 층 내에서 무응답 조사단위와 응답 조사단위가 무응답 항목에 대해서 유사할 것으로 가정하고 무응답을 대체하는 방법. ___ (단위/항목) 무응답을 처리하기 위한 방법이다. ___ 할 적당한 변수가 없을 경우 사용 가능. ___ 왜곡 문제를 완화할 수 있음.",
    correct: ["핫덱", "항목", "정렬", "표본분포"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "___ : 조사구 추출에서 조사구내에 포함된 가구 수에 비례하도록 추출확률을 주어 표본조사구를 추출하는 방법. 가구 수가 많은 조사구가 추출될 확률이 커지므로 대표성이 높아짐",
    correct: ["확률비례계통추출법"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "___ : 표본조사를 완료한 후에 모집단의 구조와 표본의 구조를 맞추기 위해서 층화하는 방법. 모수추정에서 ___ 을 줄이는 효과가 있음",
    correct: ["사후층화", "편향"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "___ 배분법: 표본을 배분하는 방법 중 하나. 층의 크기에서 많은 차이가 있을 경우에 층 단위의 통계생산을 안정적으로 하기 위함.",
    correct: ["제곱근비례"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "표본평균 $\\bar{y}$의 ___ 은 $\\frac{N-n}{N}\\cdot\\frac{s^2}{n}$이다.",
    correct: ["분산추정량"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "___ (fpc) : 표본조사에서의 모집단은 유한모집단이기 때문에 곱해주는 값",
    correct: ["유한모집단수정항"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "표본을 추출할 때 ___ 추출법 : 불량률 조사, 시장조사, 전화조사, 여론조사 등에 쓰인다. 선택 ___ 을 제거하기 위한 수단.",
    correct: ["단순임의", "편향"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "___ 의 ___ 추정량은 $N^2\\cdot\\frac{N-n}{N}\\cdot\\frac{s^2}{n}$ 이다.",
    correct: ["모총계", "분산"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "표본조사를 통해 각 조사단위로부터 직접적으로 알아내고자 하는 관심변수",
    correct: ["주변수"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "주변수 이외 조사단위에 관한 정보로 일반적으로 주변수와 연관성이 높은 변수일 경우 유용성이 높음",
    correct: ["보조변수"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "표본 조사단위로부터 주변수 외에 보조변수의 값도 얻을 수 있을 때 주변수와 보조변수의 비율을 이용하는 추정방법",
    correct: ["비추정"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "두 가지 서로 다른 추정량들의 효율을 비교하기 위해 사용되는 측도로 서로 다른 추정량의 분산 비(比)를 뜻함",
    correct: ["상대효율"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "두 변수 x와 y사이의 직선 관계식을 가정하여 구하는 추정량으로 회귀분석에서 두 변수 사이의 회귀식을 구하는 것과 유사함",
    correct: ["회귀추정"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "주변수와 보조변수가 원점을 지나는 직선관계를 지닐 경우 ___ 이 적절한 반면, 원점을 지나지 않는 직선관계일 경우에는 ___ 이 적절하다.",
    correct: ["비추정", "회귀추정"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "비추정량이 표본평균에 비해서 효과적인 경우는 X(보조변수) 와 Y(관심변수) 의 상관계수가 ___ 보다 큰 경우이다.",
    correct: ["0.5"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "___ 회귀추정량의 ___ 은 $\\frac{N-n}{N}\\cdot\\frac{MSE}{n}$ ($MSE$는 회귀분석의 평균제곱오차)",
    correct: ["모평균", "분산"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: "___ 회귀추정량은 $\\bar{y}+b(\\mu_x-\\bar{x})$",
    correct: ["모평균"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: "___ 회귀추정량은 $N\\cdot[\\bar{y}+b(\\mu_x-\\bar{x})]$",
    correct: ["모총계"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "___ : 모집단을 서로 겹쳐지지 않게 몇 개의 부분군으로 나누는 일. ___ 을 결정하는 가장 중요한 작업.",
    correct: ["층화", "효율"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "보조변수 x와 주변수 Y의 상관계수의 절대값이 ___ 에 가까울 때 회귀추정량을 이용한 추정이 표본평균에 비해 효율적이다.",
    correct: ["1"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "층화임의추출법 - 같은 층에 속한 단위들이 ___ 일 수록, 층간에는 ___ 일 수록 효과적. 전체 추정 뿐 아니라 각 층별로도 추정이 가능. 표본의 대표성 제고 및 조사 관리 편리, 조사비용 절감.",
    correct: ["동질적", "이질적"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "모집단을 몇 개의 층으로 나누려고 할 때 각 추출단위가어느 층에 속하는지를 구분하기 위해 기준으로 사용되는 변수",
    correct: ["층화변수"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "층화변수의 선택시 고려사항: ___ 와의 관련성. 활용가능한 ___ 의 종류. 통계의 작성단위 - 전국/시도별/시군별.",
    correct: ["주변수", "보조정보"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "___ : 층의 최적경계점을 설정하는 방법. Dalenius & Hodges 가 개발함. 추정값의 분산을 최소화시킬수 있도록 하는 경계점을 설정함.",
    correct: ["누적도수제곱근법"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "각 층의 정보를 통해 모집단 전체의 분산을 구하려면, (각 층에서의 분산) * (각 층의 ___ 을 각 층의 ___)을 전부 더한 다음 전체 모집단의 ___ 로 나눈다.",
    correct: ["분산", "N^2", "N^2"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "층화임의추출법에서 표본의 크기가 정해졌을 때 추정의 효율을 최대화시킬 수 있도록 각 층별로 표본수를 배분하는 전략",
    correct: ["표본배분"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message:
      "층화임의추출법에서 각 층 내의 모집단 추출단위들의 수에 비례하여 표본의 크기를 배분하는 방법. 일반적으로 사회조사에서 널리 활용됨",
    correct: ["비례배분"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "다음 공식을 쓰는 배분법은 ___ 배분법이다.",
      "$$n\\cdot\\frac{N_hS_h}{\\sum_{k=1}^HN_kS_k}$$",
      "$$\\frac{(\\sum_{h-1}^{H}N_hS_h)^2}{N^2D+\\sum_{h=1}^HN_hS^2_h}$$",
    ],
    correct: ["네이만"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "___ 배분법: 주어진 비용 하에서 추정량의 분산을 최소화시키거나 주어진 분산의 범위 하에서 비용을 최소화시키는 방법",
    ],
    correct: ["최적"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "___ : 단순임의추출법에 따라 얻어진 표본의 구성이 이미 알고 있는 모집단 특성 비율을 제대로 반영하지 못할 경우 표본 데이터에 대하여 추후에 층을 구분하여 추정하는 방법",
    ],
    correct: ["사후층화"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "층화임의추출에서 각 층에 표본을 배분할 때 고려할 요인 세 가지. 각 층에서의 ___ ...",
    ],
    correct: ["크기, 변동, 조사비용"],
    tags: ["표본조사론"],
  },
  {
    type: "pick",
    message: ["진실을 고르시오."],
    correct: "층화추출은 단순임의추출보다 더 효과적일 수도, 아닐 수도 있다.",
    options: [
      "층화추출은 단순임의추출보다 더 효과적이다.",
      "층화추출은 단순임의추출보다 더 효과적이지 않다.",
    ],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "1/k ___ 추출법 : 모집단의 추출틀에서 처음의 k개 단위들 중에서 랜덤하게 하나의 단위를 추출하고, 그 이후 매 k번째 간격마다 하나씩의 단위를 표본으로 추출하는 방법. 표본추출이 간편함. ___ 추출법의 대용으로 사용할 수 있음. 단점 - 추정량의 ___ 를 계산할 수 없음. 추출틀이 주기성을 갖고 있을 때에는 사용하기 힘듬.",
    ],
    correct: ["계통", "단순임의", "표본오차"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "___ : N !== nk 일 경우 추출간격 k를 근사값으로 사용하지 않고 N/n (소수점 이하의 숫자 포함) 값을 사용하는 추출 방법",
    ],
    correct: ["분수간격법"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "급내상관계수: 동일한 계통표본 내에 있는 단위 간의 급내상관관계를 나타내는 측도. 만일 값이 1에 가까우면 단위들의 조사변수값들이 서로 매우 ___(동질/이질)적이다라는 것을, p 값이 음수일 때에는 ___(동질/이질)적이다 라는 것을 나타낸다. 이론적인 값이기 때문에 실제 문제에서 추정할 수 없다.",
    ],
    correct: ["동질", "이질"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "__ 모집단: 모집단에서 조사단위(또는 추출단위)의 배열이 조사 특성값과 아무런 관련성 없이 배열되어 있는 모집단을 의미. p ___ 0",
    ],
    correct: ["랜덤", "="],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "__ 모집단: 모집단에서 조사단위(또는 추출단위)의 배열이 조사 특성값의 크기 순서대로 나열되어 있는 모집단을 말함.  p ___ 0. 랜덤보다 ___ (효율/비효율)적.",
    ],
    correct: ["순서", "<", "효율"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "__ 모집단: 모집단에서 조사단위(또는 추출단위)의 특성값이 주기적으로 변동하는 모집단. p ___ 0. 랜덤보다 ___ (효율/비효율)적.",
    ],
    correct: ["순서", ">", "비효율"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "집락추출법",
      "가. 최신 정보를 포함한 추출틀 작성이 곤란한 경우에 사용할 수 있다.",
      "나. 조사비용이 ___(높다/낮다).",
      "다. 같은 표본 크기의 다른 추출방법에 비해서 추정의 정확도가 ___(높다/낮다).",
    ],
    correct: ["낮다", "낮다"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "___ : 추정량의 분산 측면에서 특정 표본추출법과 단순임의추출법을 비교하기 위하여 구한다.",
    ],
    correct: ["설계효과"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "설계효과가 1보다 크면 ___ 표본크기의 ___ 추출법 에 비해서 효율이 ___(높음/낮음)을 의미한다. 보통 집락추출법의 설계효과는 1보다 크다.",
    ],
    correct: ["같은", "단순임의", "낮음"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "집락 내 기본 단위들이 ___(이질/동질) 적으로 구성되어 집락내분산이 ___(큰/작은) 경우에 집락추출법이 효과적임.",
    ],
    correct: ["이질", "큰"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "___ 추출법: 모집단을 구성하는 집락들의 규모가 심하게 차이 날 경우에 동일한 확률로 뽑지 않고 각 집락의 규모측도에 비례하여 뽑는 방법",
    ],
    correct: ["확률비례"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "___ : 조사항목과 상관관계가 높은 것을 채택하면 추정의 효율이 높아짐",
    ],
    correct: ["규모측도"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      " 확률비례추출법은 조사변수의 ___ 와 집락 내의 조사단위의 ___ 와 양의 상관관계가 뚜렷할 때 효율적이다.",
    ],
    correct: ["합계", "수"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "___ 추출법: 모집단의 집락들 중에서 표본집락을 추출하고, 추출된 표본집락 내의 일부 조사단위들을 추출하여 조사하는 방법이다.",
    ],
    correct: ["2단집락"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "어느 시에서 실시한 가구조사, A 개의 동으로 구성되고, $i$번째 동은 $B_i$ 개의 통으로 구성. 여기서 1차추출단위는 ___ 이고 2차추출단위는 ___ 이다.",
    ],
    correct: ["동", "통"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "전국의 성인을 대상으로 하는 건강조사와 같은 대규모 표본조사에서 다단계추출법을 사용하는 가장 중요한 이유는 ___ 이다.",
    ],
    correct: ["조사비용절감"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "일반적으로 2단집락추출법을 적용할 경우에는 조사비용과 시간에 가장 영향을 미치는 것은 ___ 의 수이다.",
    ],
    correct: ["1차추출단위"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "___ 설계: 각 단계에서 적절하게 표본추출법과 추출률을 정함으로써 표본 내의 모든 조사단위들이 전체적으로 같은 추출확률을 갖도록 하는 표본설계를 말한다. 이러한 표본추출법을 ___ 추출방법(EPSEM:Equal Probability Sampling Method)이라고도 한다.",
    ],
    correct: ["자체가중", "등확률"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "조사목적에 알맞게 개념상 정의된 조사대상자의 집합을 ___ 모집단이라 하고, 표본추출에 의하여 관찰 가능한 조사대상자들의 집합을 ___ 모집단이라고 부른다.",
    ],
    correct: ["목표", "조사"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "표본설계 과정 : ___ 확정 → 표본 ___ 결정 → 표본 ___ 결정 → 표본 ___ 결정 → 표본추출",
    ],
    correct: ["모집단", "추출틀", "추출방법", "크기"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "___ 조사 : 조사목적에 적합한 개념상 조사대상자들의 집합표본추출에 이용되는 관찰 가능한 조사대상자들의 집합대규모의 본 조사 이전에 조사일정과 설문지내용을 검증하고 조사원을 교육훈련을 목적으로 시행하는 소규모의 조사",
    ],
    correct: ["예비"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: ["CAPI와 CATI는 ___ 질문이 많은 설문조사에 적합하다."],
    correct: ["여과"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "___ 설문 : 응답자의 생각을 자유롭게 서술할 수 있도록 만들어진 설문. ___ 등으로 심층적인 자료를 얻을 수 있다.",
    ],
    correct: ["개방형", "캐어묻기"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "___ 설문 : 범주화된 응답을 응답자가 선택하도록 만들어진 설문. ___ 한 문제에 적합하다. ___ 가 쉽고 분석결과를 해석하기 용이하다.",
    ],
    correct: ["폐쇄형", "민감", "부호화"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "___ 조사 - 교육수준이 높고 연구주제에 대한 관심이 클 경우. ___ 조사 - 교육수준과 응답 동기부여가 낮을 경우.",
    ],
    correct: ["우편", "직접면접"],
    tags: ["표본조사론"],
  },
  {
    type: "short_order",
    message: [
      "전수조사인 센서스 등에서도 사후 표본조사 점검을 실시하여 ___ 가 어느 정도 되는지 살펴보게 된다.",
    ],
    correct: ["비표본오차"],
    tags: ["표본조사론"],
  },
];
