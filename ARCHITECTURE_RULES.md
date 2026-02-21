# Architecture Rules

이 문서는 Momentum Desktop 대시보드 프로젝트의 렌더링 최적화와 유지보수성을 극대화하기 위한 프론트엔드 아키텍처 필수 규칙입니다.

본 프로젝트는 여러 독립적인 위젯(Todo, Weather, Calendar 등)이 하나의 바탕화면에 모이는 대시보드 형태입니다.
따라서 전체 화면 단위의 상태 관리 대신, 제공된 디렉토리 구조(src/features, src/shared)를 기반으로 기능(Widget/Feature) 단위의 완벽한 분리와 단방향 데이터 주입 패턴을 강제합니다.

## 1. 디렉토리 및 책임 분리

**src/Display & src/shared/Layout (최상위 레이아웃)**

- 역할: 위젯들의 전역적인 배치(자유로운 위치/크기 조절), 사이드바, 메인 영역 등의 뼈대(Grid, Flex)만을 담당합니다.

- 제한: 개별 위젯(features)의 비즈니스 로직(예: 날씨 API 호출, 투두 추가)을 절대 여기서 호출하거나 관리하지 않습니다.

**src/features/[feature-name] (기능 모듈)**
각 기능(add-task, calendar, clock, weather 등)은 아래의 3가지 요소로 엄격히 분리됩니다.

1. logic/ (Custom Hooks): 기능에 필요한 파생 상태(state)와 이벤트 핸들러(actions)를 생성하는 순수 로직 영역입니다.

2. components/ (Feature Components): logic/에서 생성된 데이터를 전달받아 화면을 그리는 순수 UI 영역입니다. 절대 내부에 useState, useEffect 등의 자체 상태나 비즈니스/계산 로직을 두지 않습니다.

3. index.ts (Widget Container): 해당 기능의 단일 진입점(Container)입니다. logic/의 훅을 호출하고, 반환된 값을 조합하여 components/의 순수 UI에 Props로 주입하는 래퍼 역할을 수행합니다.

## 2. Props 규칙 및 주입 패턴

Props 네이밍 통일: 모든 Feature Component(features/\*/components)의 Props 이름은 반드시 state와 actions로 통일합니다. (loginState, onAdd 같은 개별 이름 금지)

명시적 전달: 컨테이너에서 상태를 통째로 넘기지 않고, 하위 컴포넌트가 실제로 사용하는 기능 조각만 명시적으로 내려줍니다.

객체 형태 유지: actions에 개별 핸들러를 임의로 펼쳐서(actions={{ onAdd: ... }}) 전달하지 않고, 기능 액션 객체 구조를 유지하여 전달합니다.

올바른 코드 구조 예시

```tsx
// [Container: src/features/weather/index.ts]
const { weatherData, refreshWeather } = useWeatherController();
const weatherActions = useMemo(() => ({
weatherController: { refreshWeather }
}), [refreshWeather]);

return (
<WeatherWidgetUI
state={{ weatherController: { weatherData } }}
actions={weatherActions}
/>
);

[Component: src/features/weather/components/WeatherWidgetUI.tsx]
export const WeatherWidgetUI = React.memo(({ state, actions }) => {
const { weatherData } = state.weatherController;
const { refreshWeather } = actions.weatherController;
// 순수 UI 렌더링...
});
```

3. 성능 최적화 필수 규칙 (Rendering Optimization)
   대시보드 특성상 특정 위젯(예: 투두리스트 타이핑)의 상태 변화가 다른 위젯(예: 날씨, 캘린더)의 리렌더링을 유발해서는 안 됩니다.

React.memo 필수: features/\*/components 내부의 모든 UI 컴포넌트는 반드시 React.memo로 감싸서 내보내어 렌더링 전파를 방어합니다.

useCallback 적용: logic/ 폴더에서 생성하는 모든 액션 핸들러 함수는 반드시 useCallback으로 감싸 메모리 참조값을 유지합니다.

useMemo 적용: Container(index.ts)에서 하위로 내려보내는 state와 actions 객체 묶음은 매 렌더링 시 새로 생성되지 않도록 반드시 useMemo로 묶어서 전달합니다.

4. 공통 UI 컴포넌트 규칙 (src/shared/ui & src/shared/headless)
   조합형 UI: Feature Component(features/\*/components)는 직접적인 HTML 태그(div, button, input 등) 사용을 지양하고, src/shared/ui에 정의된 공통 컴포넌트(Flex, Grid, Button, Input 등)를 조립해서 화면을 구성합니다.

Variant 기반 스타일링: 스타일이나 모양의 차이가 필요하다고 해서 새로운 이름의 컴포넌트(RedButton, LargeInput 등)를 만들지 않습니다. 반드시 기존 공통 UI 컴포넌트에 variant, size, color 등의 prop을 추가하여 확장합니다.

관심사 분리: 탭 전환, 모달 열기/닫기, 드롭다운 등 상태와 로직만 필요한 UI 처리는 src/shared/headless 영역을 적극 활용하여 비주얼과 동작을 분리합니다.

5. 네이밍 규칙
   Hook <-> Component 1:1 축 유지: 커스텀 훅과 전달되는 객체 키값은 동일한 기능 축으로 매칭합니다. (예: useClockController -> state.clockController)

컴포넌트 네이밍: 한 컴포넌트가 여러 기능을 쓰면, 가장 중요한 기능이 이름이 됩니다. 순수 UI 컴포넌트는 직관적인 명사 또는 기능명 + UI 형태로 작성합니다.

6. 🚫 금지 패턴 (Anti-Patterns)
   src/shared/Layout 또는 src/Display에서 기능 훅(Custom Hook) 직접 호출 금지.

features/\*/components(순수 UI) 내부에서 useState, useEffect 사용 및 API/서비스 직접 호출 금지.

features/\*/components 내부에서 렌더링과 무관한 데이터 가공 및 계산 로직 생성 금지 (모든 계산은 logic/에서 처리).

actions Prop에 객체 구조를 무시하고 개별 함수를 직접 나열하여 넘기는 행위 금지.
