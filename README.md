# Next - Carrot Market clone coding

### NextJS, Tailwind, Prisma, PlanetScale, Cloudflare를 사용해 serverless '당근마켓'을 클론코딩합니다.

##### Serverless 'CARROT MARKET' clone coding using NextJS, Tailwind, Prisma, PlanetScale, Cloudflare.

- "react": "^18"
- "react-dom": "^18"
- "next": "14.0.4"

<img src="https://img.shields.io/badge/Next.js-000?style=flat-square&logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>

---

- **24-01-02 : #3.0 ~ #4.8 / Set up + Tailwind CSS(1)**
  - Set up (NextJS + Tailwind CSS)
    - 기본형 : `npx create-next-app@latest`
      - TypeScript, Tailwind CSS 사용
      - (강의를 따라갈 시) App Router 사용 x
    - Tailwind CSS를 따로 설치 시
      1. `npm i -D tailwindcss postcss autoprefixer`로 패키지 설치하기
      2. `npx tailwindcss init -p`로 설정파일 만들기
         - 'postcss.config.js'와 'tailwind.config.ts' 설정파일이 생성됨
      3. 'tailwind.config.ts' 파일에서 설정하기
         - 어느 파일에서 tailwind를 사용할 지 알려주어야 함
         - 'content' 내에서 작성
         - 기본형 : `경로/**(모든디렉토리)/*(모든파일).{확장자들}`
           - ex.
             ```
             content: [
               './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
               './src/components/**/*.{js,ts,jsx,tsx,mdx}',
               './src/app/**/*.{js,ts,jsx,tsx,mdx}',
             ],
             ```
      4. 글로벌CSS 파일에서 아래의 코드를 추가하기
         - 기본형
           ```
           @tailwind base;
           @tailwind components;
           @tailwind utilities;
           ```
         - 'Unknown at rule @tailwind' 경고문 무시하기
  - Tailwind CSS
    - 유틸리티 우선 CSS framework
      - 유틸리티 : 아주 많은 class명을 가지고 있다는 뜻
      - 아주 많은 class명을 가지고 있는 CSS 파일
    - 사용법 : 요소에 적절한 class명을 추가하고 조합하여 사용
      - 반응형 디자인을 만들기 쉬움
    - <a href="https://tailwindcss.com/" target="_blank">공식문서</a>
    - <a href="https://www.npmjs.com/package/tailwind-styled-components" target="_blank">Tailwind를 styled-components와 함께 사용 가능</a>
  - World-class IDE Integration
    - Tailwind의 class명을 자동완성 기능을 제공해주는 확장프로그램
      - Tailwind는 많은 class명을 가지고 있어, 기억하기에 어렵기 때문
    - 설치법 : VSCode 확장프로그램에서 'Tailwind CSS IntelliSense'를 설치
    - 기능
      1. 자동 완성 기능 / 에러 표시 기능
      2. 색상 미리보기
      3. class명에 커서를 올릴 시 CSS를 보여줌
    - 자동 완성 기능이 바로 보이지 않을 시 'Ctrl + Space' 키를 누르기
  - Tailwind CSS의 문법 예시 (일부)
    - 배경색
      - 기본형 : `bg-색상-채도`
        - 채도 : [옵션] 50~950 사이의 값
      - ex. `bg-transparent`, `bg-blue-500`
    - 패딩 p (마진 m)
      - 기본형 : `p-값`
        - 상하좌우 : `pt` / `pb` / `pl` / `pr`
        - 가로세로 : `px` / `py`
      - 값 : 'rem' 단위 ('px'단위 사용 x)
        - rem : document font size를 기준으로하는 상대적인 크기
        - 자동완성 기능을 통해 미리 몇 px인지 알 수 있음
        - 또는 분수를 사용해 '%' 단위를 사용 가능
    - Border-Radius
      - 기본형 : `rounded-크기`
        - 크기 [옵션] { sm, md, lg, xl, full 등 }
    - Flex
      - 기본형 : `flex`
      - 방향 : `flex-방향값`
        - ex. `flex-col`
      - 자식요소 사이에 margin을 만들 수 있음 (gap)
        - 기본형 : `space-방향-값`
          - 방향 : { x, y }
          - 값 : rem 단위
        - 모든 자식요소에 자동으로 margin을 줌
    - Grid
      - 기본형 : `grid`
      - Gap : `gap-값`
        - 값 : rem 단위
    - Shadow
      - 기본형 : `shadow-크기`
        - 크기 : [옵션] { sm, md, lg 등 }
    - 정사각형
      - 기본형 : `aspect-square`
      - 가로길이를 정해주어야 함
        - 자동으로 세로길이를 똑같이 맞추어 줌
    - Ring
      - 요소의 테두리를 그리는 속성 (border와는 다름)
        - 'box-shadow'로 만들기 때문에 요소의 크기에 영향을 주지 않음
      - 기본형 : `ring-값` / `ring-offset-값` / `ring-색상-채도` / `ring-opacity-값` 등
        - 값 : rem 단위
        - ring-offset : 요소와 ring 사이의 거리
      - 주로 상태 조건(focus 등)과 함께 사용되며, ring에만 상태 조건을 사용 시 다른 CSS속성들도 같이 적용됨
        - 같은 CSS variable을 공유하고 있기 때문
        - ex. `focus:ring-2 ring-offset-2 ring-yellow-500`
  - Modifier
    - 조건에 따른 CSS를 작성하는 기능
      - hover, focus 등
      - mobile only, screen only, 화면 방향, 인쇄 시 인쇄 스타일 등 가능
    - 기본형 : `조건:CSS문`
      - ex. `hover:bg-teal-500`
      - ex. `file:hover:bg-purple-400`
      - 'transition' 사용 가능
    - 조건문 (일부 예시)
      - 상태 조건 : hover, focus, active, selection(블록드래그) 등
      - 자식 요소 : first, last, only, even, odd 등
      - empty, disabled
      - 반응형 웹 디자인
        - sm (@media (min-width: 640px))
        - md (@media (min-width: 768px))
        - lg (@media (min-width: 1024px))
      - dark (@media (prefers-color-scheme: dark))
    - <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#quick-reference" target="_blank">공식 문서</a>
  - Form Modifier
    - &lt;form&gt; : 'focus-within' 등
    - &lt;input&gt; : 'required', 'valid', 'invalid', 'placeholder', 'placeholder-shown', 'disabled' 등
    - 노말 CSS에 있는 상태 조건들임
  - Group Modifier
    - 상위 요소에 의한 하위 요소의 스타일링
      - ex. 컨테이너에 커서를 올릴 시 특정 하위 요소의 스타일을 바꾸는 방법
    - 사용법
      1. 타겟하려는 그룹에 'group/이름' class명을 선언하기
         - ex. `<div className="group/test" />`
      2. 특정 하위요소에서 group에 대한 modifier를 사용하기
         - 기본형 : `group-조건/이름:CSS문`
           - ex. `<div className="group-hover/test:bg-red-300" />`
         - 'transition' 사용 가능
  - Peer Modifier
    - 형제 요소 선택자(~)에 대한 스타일링
      - ex. 사용자가 form을 제출 시 invalid 인지 아닌지 말해줄 수 있음
      - ex. input의 상태에 따라서 다른 요소의 스타일을 변화시킬 수 있음
    - 사용법 (Group Modifier와 사용법이 같음)
      1. 상태의 주체가 되는 요소에서 'peer/이름' class명을 선언하기
         - peer 요소는 선택자 보다 앞쪽에 위치해야 함
      2. 스타일을 변화할 요소에서 peer에 대한 modifier를 사용하기
         - 기본형 : `peer-조건/이름:CSS문`
  - &lt;details&gt;
    - 사용자에게 추가적인 정보를 제공하거나 숨겨진 콘텐츠를 표시하는 일반 HTML 태그
    - &lt;summary&gt; : &lt;details&gt;의 제목을 쓰는 부분
    - 사용자가 토글 버튼을 클릭 시 세부 정보 섹션이 열리거나 닫힘
      - 상태조건 open : 세부 정보 섹션이 열렸을 때의 상태
- **24-01-04 : #4.9 ~ #5.2 / Tailwind CSS(2)**
