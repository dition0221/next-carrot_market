# Next - Carrot Market clone coding

### NextJS, Tailwind, Prisma, PlanetScale, Cloudflare를 사용해 serverless '당근마켓'을 클론코딩합니다.

##### Serverless 'CARROT MARKET' clone coding using NextJS, Tailwind, Prisma, PlanetScale, Cloudflare.

- "react": "^18"
- "react-dom": "^18"
- "next": "14.0.4"

<img src="https://img.shields.io/badge/Next.js-000?style=flat-square&logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>  
<img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white"/> <img src="https://img.shields.io/badge/PlanetScale-000?style=flat-square&logo=planetscale&logoColor=white"/>

---

- **24-01-02 : #3.0 ~ #4.8 / Set up + Tailwind CSS (1)**
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
- **24-01-04 : #4.9 ~ #5.2 / Tailwind CSS (2)**
  - 반응형 웹 디자인
    - Tailwind는 mobile을 디자인한 후, desktop을 디자인하는 방식 (모바일 우선)
      - Tailwind에서느 모바일 화면을 위한 선택자가 없음
      - 모든 class명이 기본값으로 모바일에 우선 적용되고, 보다 큰 화면들을 위한 선택자가 존재함
    - 반응형 선택자
      - 시작점이 정해져 있지만, 끝점이 정해져 있지 않음 (무한대까지 적용)
      - sm (min-width: 640px)
      - md (min-width: 768px)
      - lg (min-width: 1024px)
      - xl (min-width: 1280px)
      - 2xl (min-width: 1536px)
      - portrait / landscape
  - 다크모드
    - 기본값으로, 사용자의 기기 설정에 따라 활성화되게 되어있음
    - 기본형 : `dark:CSS문`
    - 수동으로 다크/라이트 모드를 설정 가능
      - 'tailwind.config.js'에서 기기의 설정에 따를건지, 아니면 직접 토글시킬건지 설정하기
        - 자동 : `darkMode: "media"` (기본값)
        - 수동 : `darkMode: "class"`
          - 사용할 요소에 'dark'라는 class명을 넣어야지 작동함
            - 부모 요소 중에서 .dark를 찾는 기능을 함
          - &lt;html&gt; 또는 &lt;body&gt;에 class를 추가하는 것이 일반적
            - 모든 요소의 부모 요소이기 때문
            - '\_app.tsx'에서 &lt;Components&gt;의 상위요소를 만들어도 됨
  - Just-In-Time Compiler (JIT Compiler)
    - Tailwind 3.0 이전 버전에서는 여러 개의 class를 중첩하여 사용하지 못했음
      - 수 많은 조합법이 있어, 아주 큰 CSS파일이 되기 때문
      - 배포 시 프로젝트를 스캔하여, CSS 파일에 포함된 class명을 제외하고 사용하지 않는 나머지 class들을 전부 삭제함 : purging
    - JIT 컴파일러는 코드를 실시간으로 감시하여, 필요한 class를 생성하는 기능
      - 작은 파일로 시작해, 사용한 class의 코드만 추가함
        - 개발자도구(F12)에서 &lt;head&gt; 내의 &lt;style&gt;을 통해 확인 가능
        - 선택자 중첩이 가능해짐
      - reset CSS가 존재함 (@tailwind base; 코드에 의함)
  - 사용자 정의 Tailwind CSS
    - 기본형 : '값' 부분에 `[값]` 형태로 사용
      - ex. `text-[36px]`
      - ex. `text-[#fff]`
      - ex. `bg-[url('/vercel.svg')]`
    - JIT Compiler 덕분에 사용이 가능해짐
  - 코드에 따라 Tailwind class를 바꿀 시 일종의 함수를 만듦
    - 템플릿 리터럴 대신 함수를 사용함
    - ex.
      ```
      function cls(...classNames: string[]) {
        return classNames.join(" ");
      }
      ......
      className={cls(
        "pb-4 font-medium",
        method === "email"
          ? "border-b-2 border-orange-500 text-orange-400"
          : ""
      )}
      ```
  - Tailwind plugins
    - Tailwind를 확장하는 재사용 가능한 써드파티 plugins
      - plugin : 부가적인 기능을 더해줌
      - 여러 개의 plugin들이 존재함
    - @tailwindcss/forms
      - &lt;form&gt;의 기본 스타일을 갖도록 해주는 plugin
        - &lt;input&gt;에 reset layer를 추가할 수 있음
      - 설치법 : `npm i @tailwindcss/forms`
      - 설정법 : 'tailwind.config.ts' 에서 'plugin' 프로퍼티의 배열에 'require("@tailwindcss/forms")'를 입력
        - 설정 후 자동으로 기본 스타일이 적용됨
    - <a href="https://tailwindcss.com/docs/plugins" target="_blank">공식 문서</a>
- **24-01-05 : #5.3 ~ #5.11 / Tailwind CSS (3)**
  - divide
    - 여러 개의 자식 컴포넌트 사이에 border를 그려주는 Tailwind만의 class명
      - 'space'와 비슷한 역할
    - 기본형 : `divide-축-값`
      - 축 : { x, y }
- **24-01-06 : #5.12 ~ #5.15 / Tailwind CSS (4)**
- **24-01-06 : #5.16 ~ #5.18 / Tailwind CSS (5)**
- **24-01-10 : #6.0 ~ #6.4 / Prisma + PlanetScale (1)**
  - _Update : 컴포넌트 리팩토링_
  - Prisma
    - JS(또는 TS)와 DB 사이에 다리를 놓아주는 번역기
      - Node.js and TypeScript ORM(Object Relational Mapping)
      - SQL 같은 DB언어를 작성하지 않아도 됨
        - { postgreSQL, MySQL, SQL Server, SQLite, MongoDB } 등에 사용 가능
    - 설치 및 설정법
      1. VSCode에서 'Prisma' 확장프로그램 설치하기
         - Syntax highlight, formatting, 자동완성 등의 기능
         - VSCode의 'settings.json' 파일에서 아래의 코드 추가하기 (Prettier를 위함)
           ```
           "[prisma]": {
             "editor.defaultFormatter": "Prisma.prisma",
             "editor.formatOnSave": true
           }
           ```
         - <a href="https://velog.io/@pengoose_dev/schema.prismaprettier" target="_blank">참고 문서</a>
      2. 'Prisma' 패키지 설치하기
         - `npm i prisma -D`
      3. 'Prisma' 초기화하기
         - `npx prisma init`
           - 'prisma' 폴더와 '.env' 파일이 생성됨 ('.env' 파일은 .gitignore에 등록할 것)
         - prisma CLI 사용 시의 접두사는 `npx prisma`
      4. '.env' 파일에서 'DATABASE_URL' 설정하기
      5. 'prisma/schema.prisma' 파일에서 datasource의 provider를 설정하기
         - provider : 사용할 DB의 종류
    - <a href="https://www.prisma.io/" target="_blank">공식 문서</a>
  - Prisma에서 DB model 선언법
    - 'schema.prisma' 파일에서 데이터(모델)의 모양을 설명해주어야 함
    - Prisma가 자동으로 client를 생성해 줌 (자동완성 기능 제공)
      - client를 이용해 TS로 DB와 직접 상호작용할 수 있음
    - 기본형
      ```
      model 모델명 {
        컬럼명 타입 ...
        ......
      }
      ```
      - 옵션값 : 타입의 말미에 '?' 기호를 입력
      - @id : 해당 컬럼이 model의 id임을 알려줌
      - @unique : 중복값 금지
      - @default(필드값) : 기본값 설정
        - autoincrement() : 자동으로 증가하는 필드값
        - now() : 새 데이터가 만들어질 때 그 시점의 날짜를 가져옴
      - @updatedAt : 데이터가 업데이트 될 때의 시간을 자동으로 저장
    - ex.
      ```
      model User {
        id        Int      @id @default(autoincrement())
        phone     Int?     @unique
        email     String?  @unique
        name      String
        avatar    String?
        createdAt DateTime @default(now())
        updatedAt DateTime @updatedAt
      }
      ```
  - PlanetScale
    - MySQL과 호환되는 serverless DB 플랫폼
      - DB 플랫폼 : DB를 제공함
      - serverless : 직접 서버를 관리/유지보수할 필요가 없음 (서버가 없는 것이 아님)
      - Vitess
        - MySQL을 좀 더 쉽게 scaling 할 수 있도록 하는 오픈소스 시스템
        - Google이 YouTube를 scale하기 위해 만든 것
          - 대기업이 규모에 맞게 MySQL을 scale하기 위해 쓰는 방법
          - scale
            - 해당 데이터 값의 크기 또는 범위를 나타냄
            - 데이터의 정확성과 저장 공간을 조절하는 데 사용됨
    - 설치법
      1. 회원가입 및 로그인하기
         - <a href="https://planetscale.com/" target="_blank">홈페이지</a>
      2. PlanetScale CLI 설치하기
         - 'scoop' 설치하기
           - 콘솔을 통해서 쉽게 다운로드 받을 수 있게 해주는 도구
           - powershell 관리자모드에서 `irm get.scoop.sh -outfile 'install.ps1'` 과
             `iex "& {$(irm get.scoop.sh)} -RunAsAdmin"` 명령어를 차례로 입력하여 설치
         - scoop으로 'pscale' 설치하기
           - [윈도우] 터미널에 아래와 같이 입력
             - `scoop bucket add pscale https://github.com/planetscale/scoop-bucket.git`
             - `scoop install pscale mysql`
      3. 터미널에 'pscale'를 입력해 제대로 설치되었는지 확인하기
      4. 터미널로 pscale 계정 로그인하기
         - `pscale auth login`
    - DB 생성법 (CLI 방법)
      - 홈페이지에서 DB를 생성하는 방법도 존재
      1. 지역 리스트 확인하기
         - `pscale region list`
      2. 가까운 지역에 DB를 생성하기
         - 기본형 : `pscale database create 데이터베이스명 --region 슬러그명`
           - ex. `pscale database create carrot-market --region gcp-asia-northeast3`
    - PlanetScale에서는 일종의 보안 tunnel을 이용 가능
      - 장점
        - 직접 DB의 PW를 관리하지 않아도 됨
        - MySQL을 설치/실행할 필요 없음
        - 2개의 DB를 만들어서 컴퓨터용/서버용으로 사용할 필요 없음
        - '.env' 파일에 PW를 저장할 필요 없음
      - PW없이 컴퓨터와 PlanetScale 사이에 보안 연결을 하는 방법
        1. DB와 연결하기
           - 기본형 : `pscale connect 데이터베이스명`
           - 연결을 유지해야 사용 가능
        2. '.env' 파일에 'DATABASE_URL' 입력하기
           - 기본형 : `mysql://DB연결주소/DB명`
- **24-01-11 : #6.5 ~ #6.8 / Prisma + PlanetScale (2)**
