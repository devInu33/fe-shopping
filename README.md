# fe-shopping

- [x] 검색창 관련 모듈 개발
- [x] 프로토타입 / 클래스 혼용
- [X] SCSS 및 마크업
- [X] 자동 캐러셀 이벤트
- [] 카테고리 드롭다운 애니메이션
-  [] 검색창 방향키 탐색기능


### 설계

모든 웹페이지를 컴포넌트화된 뷰로써 렌더링하고, 각 뷰는 내부에 템플릿을 가집니다. 

- 뷰는 생성되면서 initState로 각각 자신의 상태를 지정하고, 뷰에 존재하는 부모-자식 관계를 위해서 parent라는 포인터 두어 다른 뷰를 가리키게 했습니다.
- 같은 부모를 가리키는 뷰는 next 포인터로 연결되어 형제 노드가 됩니다.
- 외부에서 전역 상태를 관리할 Store 인스턴스를 생성하면서, 가장 상위 App 노드를 자신의 #head 노드로 지정합니다. 노드 순회를 위해 visitor 클래스를 따로 분리하였습니다. 이 클래스를 생성시에 주입받아서
head 노드부터 연결된 모든 컴포넌트 노드들을 순회하면서 각각의 상태를 전역 map에 세팅합니다.
- 전역 상태는 WeakMap을 사용해서 뷰 컴포넌트 개별적으로 상태를 분산해서 가질 수 있게 하였습니다. 처음에는 전역 객체를 사용했으나, 서로 다른 컴포넌트 간에 상태를 침범하는 경우가 일어나서 변경하였습니다다. WeakMap을 사용한 이유는 참조를 gc 해준다고 하여 기능을 사용해보고 싶어서 사용하였습니다.

### 렌더링

모든 렌더링은 각 컴포넌트에서 자신의 뷰에서 참조하는 상태를 setState으로 변경하면 발생합니다. setState이 일어난 컴포넌트만 렌더링 여부를 알리는 #willRender 플래그가 true로 바뀌고, store에서는
자신의 헤더노드에 render 명령을 내리면 연결된 모든 자식과 형제 노드의 render를 전부 순회하면서 실행하는데, 이 때 마찬가지로 과거 setState가 일어나서 #willRender가 true인 컴포넌트만 렌더링 됩니다.
각 컴포넌트는 throttle이나 debounce 등의 이벤트 최척화를 위한 EventHandler 클래스 객체를 의존성으로 갖고 있으며, 렌더링 및 발생 이벤트를 각각의 eventHandler가 debounce로 프레임 최적화합니다.

### 고민

현재 각 컴포넌트에 각각 프레임 최적화를 위한 핸들러가 할당되어 있어서 requestAnimationFrame이 컴포넌트의 수만큼 존재하는데, 이것보다는 하나의 애니메이션 프레임에 여러 컴포넌트의 렌더링 콜백을 밀어넣는 것이
더 부하가 덜하다고 알고 있습니다. 이를 위해서 설계를 어떻게 변경해야할지 고민입니다.

### 미구현한 점

설계를 재설계하느라 카테고리 드롭다운이나 검색창 방향키 선택 등의 이벤트를 아직 미구현하였음.