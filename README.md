# Next - Carrot Market clone coding

### NextJS, Tailwind, Prisma, PlanetScale, Cloudflare를 사용해 serverless '당근마켓'을 클론코딩합니다.

##### Serverless 'CARROT MARKET' clone coding using NextJS, Tailwind, Prisma, PlanetScale, Cloudflare.

- "react": "^18"
- "react-dom": "^18"
- "next": "14.0.4"

Front-End : <img src="https://img.shields.io/badge/Next.js-000?style=flat-square&logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/> <img src="https://img.shields.io/badge/SWR-000?style=flat-square&logo=swr&logoColor=white"/>  
Back-End : <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white"/> <img src="https://img.shields.io/badge/PlanetScale-000?style=flat-square&logo=planetscale&logoColor=white"/> <img src="https://img.shields.io/badge/iron&dash;session-18303d?style=flat-square&logoColor=white"/>  
3rd party : <img src="https://img.shields.io/badge/Twilio-f22f46?style=flat-square&logo=twilio&logoColor=white"/> <img src="https://img.shields.io/badge/Nodemailer-22B573?style=flat-square&logoColor=white"/> <img src="https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white"/>  
etc : <img src="https://img.shields.io/badge/react&dash;intersection&dash;observer-000?style=flat-square&logoColor=white"/> <img src="https://img.shields.io/badge/timeago.js-000?style=flat-square&logoColor=white"/>

![thumbnail](https://github.com/dition0221/dition0221/assets/129196812/2be6964e-d08b-4732-adad-353ecdc450ff)

---

> ![미리보기](https://github.com/dition0221/dition0221/assets/129196812/221cba83-52db-4d13-b4a0-653389a53482)
>
> **⭐ 결과물 : https://dition0221-next-carrot-market.vercel.app/**
>
> ---
>
> ![image](https://github.com/dition0221/dition0221/assets/129196812/b92900df-c767-497a-8b98-aa014483fcd9)
>
> **NextJS, Tailwind, Prisma, PlanetScale, Cloudflare** 등을 사용한 serverless '**당근마켓 클론 사이트**'입니다.
>
> - **API Route**를 사용해 Back-End를 구현하였으며, **SSR/SSG** 등을 사용하여 SEO에도 신경썼습니다.
> - **무한스크롤 pagination**을 사용하여, **UX 상향**과 **DB의 부담 하락** 장점을 적용하였습니다.
> - 해당 웹사이트는 **middleware**를 사용해 비로그인 사용자는 강제로 로그인 페이지로 이동하며, 접속국가가 **외국**이거나 **봇**을 사용한 경우 **차단**되도록 설정하였습니다.
> - ❗ _PlanetScale DB가 4/8부로 유료로 전환이되기 때문에, 다른 DB로 전환할 예정입니다._
>
> **[회원가입 & 로그인 페이지]**
>
> - E-Mail 또는 휴대폰번호를 통해 회원가입 및 로그인을 할 수 있습니다.
>   - 네이버, 한메일, 다음, 카카오 이메일만 로그인 가능합니다.
>   - 아쉽게도 휴대폰은 'Twilio' 유료 옵션 때문에 제대로 구현을 하지 못하였습니다.
> - E-Mail로 로그인 시 토큰 메일이 발송되며, 해당 토큰으로 인증 시 로그인이 완료됩니다.
>   - 토큰 유효기간 3분
> - 소셜 로그인 개발 중 (NextAuth 사용 예정)
>
> ---
>
> ![image](https://github.com/dition0221/dition0221/assets/129196812/915141eb-1968-47bf-9411-a6fb5ef3ce89)
>
> **[홈 페이지]**
>
> - 판매중인 물품들을 확인할 수 있는 페이지입니다.
> - 물픔은 상품 이미지, 제목, 가격, 총 찜 갯수를 표시합니다.
> - 우측에는 물품을 등록할 수 있는 floating 버튼이 위치해 있습니다.
>
> ---
>
> ![image](https://github.com/dition0221/dition0221/assets/129196812/3d673ba4-bbda-4a16-bf89-74d3fea45f9b)
>
> **[상품 페이지]**
>
> - 해당 상품에 대해 판매자와 채팅방을 열 수 있으며, 찜 버튼을 통해 나의 찜 목록에 저장할 수 있습니다.
> - 이름이 비슷한 경우, 아래의 관련 상품들을 볼 수 있습니다.
> - 자신의 물품이라면, 물품 수정/삭제 버튼을 제공합니다.
>
> ---
>
> ![image](https://github.com/dition0221/dition0221/assets/129196812/5dccaa67-36ec-4ce8-a492-29dc6a4a1390)
>
> **[상품 등록 페이지]**
>
> - 상품 이미지, 이름, 가격, 설명을 적을 수 있으며, 이미지를 제외한 부분은 필수요소입니다.
> - 이미지 파일 등록 시 이미지 미리보기를 제공합니다.
> - 이미지 등록 시 CloudFlare Images에 이미지 파일을 저장합니다.
>
> ---
>
> ![image](https://github.com/dition0221/dition0221/assets/129196812/cd8a5ebc-c7b6-4921-9b23-a76d1e8d6908)
>
> **[동네생활 페이지]**
>
> - 사용자가 등록한 post들을 볼 수 있습니다.
> - 각 post마다 내용, 작성자, 작성시간과 더불어 '궁금해요'와 답변의 갯수를 포함합니다.
> - 우측 floating 버튼을 통해 게시물을 등록할 수 있습니다.
>
> ---
>
> ![image](https://github.com/dition0221/dition0221/assets/129196812/d29ad4b5-c3c0-4d72-960c-35f36ba1cf6f)
>
> **[동네생활 포스트 페이지]**
>
> - 포스트의 답변 확인 및 답변 등록이 가능합니다.
> - '궁금해요'를 클릭해 on/off가 가능합니다. (count가 즉시 반영됩니다.)
>
> ---
>
> ![image](https://github.com/dition0221/dition0221/assets/129196812/4a7d701c-00a2-403b-8b3d-040898068190)
>
> **[채팅 페이지]**
>
> - 상품 페이지에서 판매자와의 채팅 버튼을 통해 생성된 채팅방 목록들을 보여줍니다.
> - 채팅 상대방의 닉네임, 아바타, 최신 채팅내역 및 시간을 보여줍니다.
>
> ---
>
> ![image](https://github.com/dition0221/dition0221/assets/129196812/a20e2cb5-6930-4333-819a-bdc90eeeb463)
>
> **[채팅방 페이지]**
>
> - 상대방과 채팅을 주고받을 수 있습니다.
>   - 아쉽게도 socketIo 등을 사용하지않아 실시간 채팅이 아닙니다.
> - 상단 화살표 버튼을 클릭해 이전 채팅 내용을 불러올 수 있습니다.
> - 현재 대화중인 상품을 확인할 수 있으며, 구매자는 '구매확정'을 할 수 있습니다.
> - 구매확정 시 리뷰를 등록할 수 있으며, 상품 및 채팅방이 삭제됩니다.
> - 나가기 시 채팅방이 삭제됩니다.
>
> ---
>
> ![image](https://github.com/dition0221/dition0221/assets/129196812/d7607060-026a-407d-974b-b9e2649db0e3)
>
> **[라이브 페이지]**
>
> - 라이브 스트리밍 목록들을 불러옵니다.
> - 우측 floating 버튼을 통해, 라이브를 시작할 수 있습니다.
> - ❗ 실제 라이브 스트림밍 기능은 동작하지 않습니다.
>
> ---
>
> ![image](https://github.com/dition0221/dition0221/assets/129196812/6e33b5aa-e022-4924-9cf1-fdb4d4abeef9)
>
> **[라이브 상세 페이지]**
>
> - 라이브 화면과 정보들을 확인할 수 있습니다.
> - 라이브 방 내에서 채팅을 주고받을 수 있습니다.
>
> ---
>
> ![image](https://github.com/dition0221/dition0221/assets/129196812/de476bc9-98a1-40a7-9324-dc4deaea75ae)
>
> **[나의 프로필 페이지]**
>
> - 자신의 간단한 프로필과 판매/구매/관심 목록, 받은 리뷰 등을 보여줍니다.
> - Edit Profile : 아바타 이미지, 이름, 이메일주소, 휴대폰번호를 수정할 수 있습니다.
> - 판매/구매 내역 : 거래 끝난 내역들을 확인할 수 있습니다.
>   - 거래 완료 시 CloudFlare images에서 이미지를 삭제하므로, 이미지는 확인 불가합니다.
> - 관심목록 : 찜한 상품들의 목록을 확인할 수 있습니다.

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
  - Vitess
    - MySQL과 호환되는 DB
      - MySQL과 비슷하지만, 다르게 처리함
    - PlanetScale은 Vitess를 사용함
    - 대량의 connections, tables과 다양한 서버들을 scaling 가능
    - MySQL에서는 하지만, Vitess에서는 하지않는 foreign key 제약
      - 일반 SQL은 DB에서 한 객체가 다른 객체에 연결된 상태를 생성하려고 할 때, DB가 자동으로 정보라는 것을 앎
        - DB에 저장 시 연결된 id주소를 확인함 (미존재 시 동작 x)
      - Vitess는 DB에 저장 시 연결된 id주소가 존재하는지 확인하지 않음
        - 에러없이 작동하기 때문에 Prisma를 이용해 도움을 받아야 함
        - DB 측에서 확인하는 것이 아니라, Prisma 측에서 확인함
      - Prisma의 도움을 받기 위한 설정법
        - 'schema.prisma' 파일에서 'datasource db' 객체에 `relationMode = "prisma"` 프로퍼티를 추가
  - Prisma schema를 기반으로 DB를 설정하고 동기화하는 방법
    - 명령어 : `npx prisma db push`
      - Prisma client가 생성됨
      - model schema가 반영됨
    - 홈페이지의 main branch에서 확인 가능
  - Prisma Studio 패키지
    - Visual Database Browser
      - DB를 위한 관리자 패널
    - 사용법 : `npx prisma studio`
  - Prisma client
    - 생각하는 방식으로 구성하고 앱에 맞춤화된 유형으로, Prisma schema에서 자동 생성되는 쿼리 빌더
      - TypeScript 및 Node.js용 직관적인 DB client
      - 'mongoose'와 같은 역할을 함
    - 'schema.prisma' 파일이 제공해줌
    - 자동으로 schema를 확인해 TypeScript로 타입을 만들어줌
      - '/node_modules/.prisma/client/index.d.ts'에서 확인 가능
    - 설치 및 사용법
      1. client 설치하기
         `npm i @prisma/client`
      2. 초기화 코드 작성하기
         ```
         // '@/libs/client.ts'
         import { PrismaClient } from "@prisma/client";
         const client = new PrismaClient();
         export default client;
         ```
    - 사용법 : 'client' 객체를 이용해 사용
      - DB의 새로운 행(record)을 생성하는 방법
        ```
        await client.모델명.create({
          data: {
            내용
          }
        });
        ```
    - Front-End에서 Prisma client를 싱행하면 안 됨 (보안 문제)
      - Back-End에서 사용해야 함
  - NextJS의 API Routes
    - NextJS로 API를 빌드하기 위한 솔루션을 제공
      - server-side 전용 번들이며, client-side 번들 크기를 늘리지 않음
    - 파일 생성 : '/pages/api' 폴더 내에서 '.tsx' 파일을 생성
      - connection 핸들러인 함수를 export default 하여 사용함
    - 기본형
      ```
      import { NextApiRequest, NextApiResponse } from "next";
      export default function handler(
        req: NextApiRequest,
        res: NextApiResponse
      ) {
        ......
      }
      ```
    - ex.
      ```
      import { NextApiRequest, NextApiResponse } from "next";
      import client from "@/libs/client";
      export default async function handler(
        req: NextApiRequest,
        res: NextApiResponse
      ) {
        await client.user.create({
          data: {
            email: "hi",
            name: "hi",
          },
        });
        res.json({
          ok: true,
        });
      }
      ```
- **24-01-12 : #7.0 ~ #8.5 / React-Hook-Form + Refactoring**
  - React-Hook-Form 패키지
    - React에서 검증, 에러, 이벤트 같은 필요한 기능들을 넣어서 form을 만들 수 있게 해주는 패키지
    - 설치법 : `npm i react-hook-form`
  - React-Hook-Form 사용법
    - 선언법 : `const { 요소들 } = useForm<제네릭>(옵션);`
      - 옵션 'defaultValues' : field의 초기값 설정 가능
      - 옵션 'mode' : register의 검증 및 에러메시지가 나타나는 시점을 선택
        - [기본값] 'onSubmit'
    - register : [필수] &lt;input&gt;을 state와 연결시켜주는 메서드
      - 사용법 : `<input {...register(이름, 옵션?)} />`
      - 옵션을 사용해 각각의 field에서 검증 기능(+ 에러 메시지)을 사용 가능
        - 옵션 : { min, max, minLength, maxLength, pattern(정규식), validate 등 }
      - validate : 커스텀 검증 규칙을 생성하는 프로퍼티 (여러 개 가능)
        - 기본형 : `validate : { 검증명 : (value) => 불리안값 || "메시지" }`
        - ex.
          ```
          validate: { notGmail: (value) => !value.includes("@gmail.com") || "No Gmail"}
          ```
    - handleSubmit : [필수] form을 제출 시 사용하는 메서드
      - 사용법 : `<form onSubmit={handleSubmit(유효시실행함수, 무효시실행함수?)}>`
        - 주로 검증함수를 사용
      - 유효시실행함수 : `const 변수명 = (data: 제네릭) => { ... };`
      - 무효시실행함수 : `const 변수명 = (errors: FieldErrors) => { ... };`
    - watch : 콘솔창에서 확인할 수 있는 메서드
      - ex. `console.log(watch());`
    - reset : &lt;form&gt;의 모든 필드를 초기화하는 메서드
      - 사용법 : `reset();`
    - formState.errors : 에러 메시지
  - &lt;form&gt;에서 Back-End로 데이터를 보내는 방법
    - onSubmit을 통해 Back-End로 데이터를 전송
      - POST fetch를 사용
      - 기본형
        ```
        fetch(URL주소, {
          method: "POST",
          body: JSON.stringify(폼데이터),
          headers: {
            "Content-Type": "application/json",
          },
        });
        ```
      - headers의 '"Content-Type": "application/json"'이 있으면 object로 받음
        - 없으면 JSON문자열(원시 본문)로 받음
      - ex.
        ```
        fetch("/api/users/enter", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        ```
    - API Route에서는 'req.body'로 &lt;form&gt; 데이터를 수신
      - ex.
        ```
        export default async function handler (
          req: NextApiRequest,
          res: NextApiResponse
        ) {
          if (req.method !== "POST") return res.status(405).end();
          console.log(req.body.email);
          return res.status(200).end();
        }
        ```
    - 반복되는 부분이 있기에 utility 함수(또는 Hook)를 만드는 것이 편함
  - 커스텀 React Hook
    - '.tsx' 파일을 생성해 컴포넌트의 함수, 변수 등을 return하여 사용
  - NextJS API Routes의 규칙
    - 무조건 함수를 export default 해야함
      - 함수를 return함으로써 NextJS에서 실행되기 떄문
      - 실행할 함수를 return하는 함수를 만드는 것
    - 고차함수 (HOF; Higher-Order Function)
      - 하나 이상의 함수를 인자로 받고, 함수를 return하는 함수
        - 함수를 다루는 함수
    - 커스텀 유틸리티 함수를 사용 시 handler 함수를 return 해야함
    - ex.
      ```
      // API Route
        async function handler(req: NextApiRequest, res: NextApiResponse) {
          console.log(req.body);
          return res.status(200).end();
        }
        export default withHandler("POST", handler);
      // Utility fn.
        export default function withHandler(
          method: "GET" | "POST" | "DELETE",
          fn: (req: NextApiRequest, res: NextApiResponse) => void
        ) {
          return async function (req: NextApiRequest, res: NextApiResponse) {
            if (req.method !== method) return res.status(405).end();
            try {
              await fn(req, res); // handler fn.
            } catch (error) {
              console.log(error);
              return res.status(500).json({ error });
            }
          };
        }
      ```
  - import문에서 절대경로 사용법
    - 'tsconfig.json' 파일에서 'compilerOptions' 객체에 아래와 같은 프로퍼티를 추가
      ```
      "paths": {
        "@/*": ["./src/*"]
      }
      ```
    - NextJS 프로젝트 생성 시 자동으로 설정 가능
      - React 프로젝트에서 수동으로 설정 가능
- **24-01-16 : #9.0 ~ #9.2 / Authentication(1)**
  - 휴대폰 번호를 사용한 회원가입/로그인 단계
    1. 폰 번호를 Back-End로 전송
    2. Back-End에서 DB에게 사용자의 폰 번호를 검색
       - DB에 사용자 정보가 존재하는 지의 여부를 알기 위함
         - (미 존재 시) 회원가입 시키기
         - (존재 시) 로그인 하기
    3. 사용자를 위한 토큰 생성
       - 토큰은 사용자와 연결되어 있음
         - User 모델과 관계를 짓는 Token 모델을 만들어야 함
    4. 난수를 사용하여, 사용자가 로그인 시 난수를 SMS로 발송
       - 검증을 통해 사용자는 토큰을 발급 받음
    5. Front-End에서 폰 번호 입력칸을 가리고, 난수(토큰) 입력칸을 추가하기
       - 토큰 입력 시 Back-End로 전송
    6. Back-End에서 토큰과 연결된 사용자 정보를 DB에서 찾아 가져오기
       - 사용자를 찾았다면 로그인 시키기
  - [Prisma] DB에서 데이터를 찾는 방법
    - 기본형
      ```
      const 변수명 = await 클라이언트.모델명.findUnique({
        where: {
          조건문,
        },
      });
      ```
      - 또는 `.findFirst()`를 사용
    - ex.
      ```
      const { phone, email } = req.body;
      const user = await client.user.findUnique({
        where: {
          email,
        },
      });
      ```
  - [Prisma] `upsert` 메서드
    - 데이터를 찾은 후, 있으면 업데이트 / 없으면 생성하는 메서드
    - 기본형
      ```
      const 변수명 = await 클라이언트.모델명.upsert({
        create: { 데이터가 없을 시 생성문 },
        update: { 데이터가 존재할 시 업데이트문 },
        where: { 조건문 },
      });
      ```
  - DB를 통해 사용자 정보를 체크한 후, 없다면 새로운 계정 생성
    - ex.
      ```
      const { phone, email } = req.body;
      const payload = phone ? { phone: +phone } : { email };
      const user = await client.user.upsert({
        where: { ...payload },
        create: {
          name: "Anonymous",
          ...payload,
        },
        update: {},
      });
      ```
    - <a href="https://nickname.hwanmoo.kr/" target="_blank">랜덤 닉네임 API</a>
  - 토큰의 모델 스키마 생성
    - schema model에서 다른 schema model과 연결하는 방법
      - 기본형 : `컬럼명 모델명`
      - 저장 시 자동 완성 기능으로 다른 정보들이 알아서 들어옴
      - 모델과 모델Id를 가지고 있는 이유 : DB에 실제 모델의 전체 데이터가 들어가지 않기 때문
      - 연결된 모델의 데이터 정보에 접근이 가능함
    - `relationMode = "Prisma"`에 대한 경고문이 나올 시 `@@index([모델명 Id])`를 추가하기
    - ex.
      ```
      model Token {
        id        Int      @id @default(autoincrement())
        payload   String   @unique
        user      User     @relation(fields: [userId], references: [id])
        userId    Int
        createdAt DateTime @default(now())
        updatedAt DateTime @updatedAt
        @@index([userId])
      }
      // User 모델에서는 'tokens Token[]' 컬럼이 추가됨
      ```
    - model schema 생성 후, PlanetScale에 넘겨주어야 함
      - 명령어 : `npx prisma db push`
  - 토큰 생성하기
    - 생성 시 model schema의 필수 요소들을 사용해야 함
    - user는 사용자 모델과 연결해야 함
      - { create?, connectOrCreate? , connect? }
        - connect : 새로운 Token을 이미 존재하는 User와 연결
        - create : 새로운 Token을 생성하면서, 새로운 User도 생성
        - connectOrCreate : User를 찾은 후, 있다면 Token과 연결 / 없다면 User를 생성
    - ex.
      ```
      // 'connectOrCreate'를 이용해 사용자를 'upsert'하는 코드와 합칠 수 있음
        // 조건을 만족하는 User가 있는 경우, Token과 연결
        // 없는 경우, User를 생성하고 Token과 연결
      const method = phone ? { phone: +phone } : email ? { email } : null;
      const payload = Math.floor(100000 + Math.random() * 900000) + "";
      const token = await client.token.create({
        data: {
          payload,
          method: {
            connectOrCreate: {
              where: {
                ...method,
              },
              create: {
                name: "Anonymous",
                ...method,
              },
            },
          },
        },
      });
      ```
- **24-01-18 : #9.3 / Authentication(2)**
  - _ISSUE : twilio에서 SMS 테스트 중 21608 에러 발생_
    - _인증받은 번호라도 평가판으로는 제대로 작동하지 않는 것으로 보임_
  - Twilio
    - 휴대폰 번호를 가지고 여러가지 통신 기능을 서비스해주는 플랫폼
      - SMS 발송, 전화 연결, 안심번호 등
      - 회원가입 시 무료 15$를 받을 수 있음
    - [콘솔] SMS 발송을 위한 설정법
      1. 'Messaging'-'Services'에 접속 후, 메시징 서비스 생성하기
      2. 'Sender Pool'에서 가상 전화번호 등록하기
         - 'Messaging'-'Try it out'-'Send an SMS'에서 전화번호를 받음
         - 가상 전화번호를 받을 수 있음 (가격 1$/월)
      3. SMS 테스트하기
         - 'Messaging'-'Try it out'-'Send an SMS'에서 테스트 가능
      4. '.env' 파일에 사용할 환경변수 저장하기
         - { 계정 SID, 인증 토큰, 서비스 SID 등 }
    - '네이버 클라우드 플랫폼'에서 SMS 기능을 사용할 수 있음
    - <a href="https://www.twilio.com" target="_blank">홈페이지</a>
- **24-01-22 : #9.4 ~ #9.10 / Authentication(3)**
  - [Twilio] 설치법 : `npm i twilio`
  - [Twilio] 코드로 SMS를 보내는 방법
    1. 'twilio client' 생성하기
       - 기본형
         ```
         import twilio from "twilio";
         const 변수명 = twilio(계정SID, 인증토큰);
         ```
    2. SMS 발송하기
       - 기본형
         ```
         await 트윌리오클라이언트.messages.create({
           messagingServiceSid: 메시지서비스SID,
           to: 받는사람휴대폰번호,
           body: 메시지내용,
         });
         ```
  - nodeMailer
    - NodeJS 환경에서 이메일을 쉽게 보낼 수 있게 도와주는 패키지
      - SMTP(Simple Mail Transfer Protocol) 서버를 통해 이메일을 보낼 수 있음
      - 네이버 메일로도 사용 가능 (SMTP 설정해야 함)
      - <a href="https://support.google.com/mail/answer/22839" target="_blank">구글은 하루에 500개 발송으로 제한</a>
        - 'SendGrid' 같은 플랫폼을 이용 시 발송 제한이 없음
    - 설치법 : `npm i nodemailer`
      - 타입스크립트 : `npm i -D @types/nodemailer`
    - 설정법
      1. 앱 비밀번호를 환경변수로 저장하기 (구글 메일 사용 시)
         - '구글 계정 관리 - 보안 - 2단계 인증 - 앱 비밀번호'에서 16자리 비밀번호를 저장
      2. 'transporter' 변수 생성하기
         - 기본형
           ```
           import { createTransport } from "nodemailer";
           const 변수명 = createTransport({
             service: "플랫폼",
             auth: {
               user: 보내는사람메일주소,
               pass: 메일앱비밀번호,
             },
           });
           ```
         - 플랫폼 : { "gmail", "Naver" 등 }
    - 메일 발송 사용법
      1. 메일 옵션 설정하기
         - 기본형
           ```
           const 변수명: SendMailOptions = {
             from: 보내는사람메일주소,
             to: 받는사람메일주소,
             subject: 제목,
             text?: 내용(text),
             html?: 내용(html),
           };
           ```
      2. 메일 발송하기
         - 기본형 : `await 트랜스포터.sendMail(메일옵션);`
    - <a href="https://blog.naver.com/enne123/222969519973" target="_blank">참고자료</a>
  - [Prisma] DB에서 삭제 시 설정법
    - 다른 model과 관계짓는 데이터를 삭제 시 에러가 뜰 수 있음
    - 해결법 : model schema에서 `onDelete: Cascade` 프로퍼티를 추가
      - 데이터 삭제 시 관계가 있는 model의 데이터도 같이 삭제되도록 함
        - Cascade : 부모 레코드가 삭제될 시 자식 레코드도 삭제하는 방법
    - prisma 수정 후 `npx prisma db push` 명령어를 통해 schema 변경 적용하기
    - ex.
      ```
      model Token {
        id        Int      @id @default(autoincrement())
        payload   String   @unique
        user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
        userId    Int
        createdAt DateTime @default(now())
        updatedAt DateTime @updatedAt
        @@index([userId])
      }
      ```
  - iron session
    - 서명, 암호화된 쿠키를 사용하는 NodeJS 무상태 session 도구 패키지
      - 사용자에게 쿠키를 주고, 사용자가 요청을 보냈을 때 누구인지 알 수 있도록 인증
      - JWT(Json Web Token)와는 다름
        - 웹에서 정보를 안전하기 전송하기 위한 토큰 기반의 인증 방식 중 하나
        - JWT는 정보를 JSON 형식으로 표현
        - 서버와 클라이언트 간의 인증을 위해 사용됨
        - JWT는 암호화되지 않고, 서명이 되었을 뿐임
          - 세션 DB를 사용하지 x
      - 세션 DB를 사용하지 않고도, 세션을 처리할 수 있는 패키지 (서버리스)
    - 작동 방식
      1. 사용자 정보를 암호화
      2. 이 암호화된 정보를 사용자에게 쿠키로 전송
      3. 사용자가 Back-End로 요청 시 쿠키를 같이 전송
      4. Back-End에서 쿠키를 복호화하여 사용자를 확인
    - 설치법 : `npm i iron-session`
    - 세션에 커스텀 프로퍼티를 추가해 업데이트 시 `getIronSession()`에서 Type(제네릭) 정의를 해주어야 함
    - 사용법 (생성 및 업데이트)
      - session 생성 기본형
        ```
        import { getIronSession } from "iron-session";
        const 세션명 = await getIronSession<인터페이스명>(req, res {
          password: 세션패스워드,
          cookieName: 쿠키이름,
        });
        ```
      - session 업데이트 기본형
        ```
        // 해당 session에 커스텀 프로퍼티를 추가 및 업데이트
        세션명.프로퍼티명 = 값;
        await 세션명.save();
        ```
    - 옵션
      - password : [필수] 쿠키를 암호화하는 데 사용하는 개인키
        - 32자 이상이어야 함
        - 강력한 비밀번호 사용 시 <a href="https://1password.com/password-generator/" target="_blank">해당 홈페이지</a> 사용
      - cookieName : [필수] 쿠키 저장 시의 쿠키명
      - ttl? : 세션 유효기간 (초 단위)
        - 기본값 14일
        - '0' 입력 시 iron-session이 자동으로 최대값을 적용함
      - cookieOption? : 'Set-Cookie' 속성이 아닌 경우를 제외한 쿠키 옵션 (문서 참고)
    - ex.
      ```
      interface IIronSessionData {
        user?: {
          id: number;
        };
      }
      const session = await getIronSession<IIronSessionData>(req, res, {
        password: process.env.SESSION_PW!,
        cookieName: "carrot-session",
      });
      session.user = {
        id: tokenExists.id,
      };
      await session.save();
      ```
    - 사용자 로그아웃 시 session을 만료시켜야 함
      - 기본형 : `await 세션명.destroy();`
    - 쿠키의 저장용량이 크지 않기 때문에, 많은 데이터를 저장하는 것은 좋지 않음
    - <a href="https://github.com/vvo/iron-session#readme" target="_blank">홈페이지</a>
    - <a href="https://youtu.be/tosLBcAX1vk" target="_blank">참고자료(세션, 토큰, 쿠키의 정의)</a>
  - [Prisma] 데이터와 연결된 model schema 데이터를 가져오는 방법
    - DB 데이터의 기본값은 연결된 model의 id값만 가져옴
    - 기본형 : DB에서 데이터를 가져올 때 `include: { 모델명: true }`를 추가
      - prisma가 자동으로 model의 id값을 가지고 해당 테이블을 검색해 가져옴
    - ex.
      ```
      const tokenExists = await client.token.findUnique({
        where: { payload: String(token) },
        include: { user: true },
      });
      ```
  - 로그인 시 토큰 삭제하기
    - 토큰 인증 후 쓸모 없어진 토큰들을 DB에서 삭제해야 함
    - 기본형 : DB의 `.deleteMany()` 메서드를 사용해 해당 userId의 모든 토큰을 삭제
    - 로그인된 사용자가 로그인페이지에 오지 못하도록 막아야 함
  - NextAuth
    - NextJS에서 Authentication 구현을 도와주는 패키지
      - 패키지 설정(대부분 복붙)만 하면, 자동적으로 동작함
    - 특징
      - DB가 필요없음 (Back-End가 없음)
        - 사용자 기록을 저장하는 데이터가 없지만, DB에 저장이 가능하긴 함
        - <a href="https://next-auth.js.org/adapters" target="_blank">참고문서</a>
      - 어떤 사용자가 로그인 됐는지는 알 수 없지만, 로그인 여부는 알 수 있음
    - <a href="https://next-auth.js.org/" target="_blank">홈페이지</a>
- **24-01-24 : #10.0 ~ #10.4 / Authorization + SWR**
  - Protected Route & API Route
    - 비로그인 사용자가 특정 페이지(또는 API 페이지)를 사용하지 못하도록 해야함
      - 비로그인 사용자가 API Route에서 session을 이용해 DB로부터 사용자를 찾는 행위는 에러가 발생하기 때문
      - { 로그인/비로그인 전용 페이지, 로그인/비로그인 전용 핸들러 }
    - API Route 보호하기
      - 'withHandler()' 커스텀 함수에서 로그인 유무에 대한 Boolean 값을 받는 인자를 추가함
      - '로그인전용 + 비로그인 사용자' 시 401 상태코드를 반환'
      - ex.
        ```
        interface IWithHandlerProps {
          handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
          isPrivate?: boolean;
        }
        export default function withHandler({
          handler,
          isPrivate = false,
        }: IWithHandlerProps) {
          return async function (req: NextApiRequest, res: NextApiResponse) {
            // Protected API route from user
            const session = await getSession(req, res);
            if(isPrivate && !session.user) {
              return res.status(401).json({ ok: false });
            }
            // Execute API route
            try {
              await handler(req, res);
            } catch {
              console.log(error);
              return res.status(500).json({ ok: false, error });
            }
          };
        }
        ```
    - Route 보호하기
      - Front-End에서 사용자 프로필을 확인할 수 있는 API Route로부터 fetch하여 가져옴
        - 커스텀 hook을 생성하여 간단하게 사용
        - 사용지 프로필이 존재 시 프로필 데이터를 반환
        - 미 존재 시 로그인페이지로 redirect
      - ex.
        ```
        export default function useUser() {
          const router = useRouter();
          const [user, setUser] = useState<Profile>();
          useEffect(()=>{
            (async () => {
              const data: IUserResponseType = await (await fetch("/api/users/me")).json();
              if (!data.ok) {
                return router.replace("/enter");
              }
              setUser(data.profile);
            })();
          }, [router]);
          return user;
        }
        ```
      - redirect 시 화면 깜빡거림 현상이 있다면, middleware를 사용해 문제해결 가능
      - `router.push()`는 브랑줘 히스토리에 기록이 남지만, `router.replace()`는 기록하지 않음
      - 여러 개의 페이지에서 해당 hook을 사용 시 매번 API fetch를 해야하므로 좋지 않음
        - 캐싱을 이용해 모든 페이지에서 데이터를 공유하도록 해야함
        - 'SWR' 패키지를 사용
  - SWR 패키지
    - React hook 기반의 데이터 fetching 라이브러리
    - 특징 : SWR(Stale While Revalidate)은 HTTP 캐시 무효화 전략
      - 데이터를 rendering하기 전에 캐시된 데이터를 먼저 사용하고, 동시에 백그라운드에서 새로운 데이터를 가져오는 전략
      - 데이터가 업데이트 되었다면, 자동으로 업데이트된 데이터로 대체됨
        - 컴포넌트가 데이터의 변경을 계속 자동으로 감지할 수 있음
        - 다른 탭에 갔다가 돌아왔을 시 자동으로 데이터를 새로고침 해줌 (실시간처럼 느껴짐)
    - <a href="https://goongoguma.github.io/2021/11/04/React-Query-vs-SWR/" target="_blank">React-Query와 SWR 비교</a>
    - 설치법 : `npm i swr`
    - 사용법 : `const { data, error, isLoading, mutate 등 } = useSWR<제네릭>(URL주소, fetcher함수);`
      - URL주소 : API를 요청할 URL이면서, 캐시를 저장할 때 사용할 key이기도 함
      - fetcher함수 : 첫 번째 인자(URL주소)로 요청을 보내는 함수
        - 데이터를 불러오고, 해당 데이터를 return하는 함수
      - mutate : 캐시 안에 저장된 data를 수정하는 함수
    - fetch 데이터를 캐시에 저장하므로, 앱의 어느 곳에서라도 같은 데이터를 사용 가능
      - 같은 key(URL주소)를 가진 fetch 데이터이어야 함
    - ex.
      ```
      const fetcher = async (url: string) => await (await fetch(url)).json();
      export default function useUser() {
        const router = useRouter();
        const { data, isLoading } = useSWR<IUserResponseType>("/api/users/me", fetcher);
        // If no-login, Redirect to "/enter"
        useEffect(()=>{
          if (data && !data.ok) router.replace("/enter");
        },[data, router]);
        return { user: data?.profile, isLoading };
      }
      ```
    - <a href="https://swr.vercel.app/ko" target="_blank">홈페이지</a>
  - [SWR] Global SWR Configuration (전역 설정)
    - 모든 `useSWR()` hook에 대한 기본값을 지정할 수 있는 전역 설정
      - `useSWR()`을 여러 번 사용 시 일일이 fetcher함수를 작성하거나 import하기가 꺼려지기 때문
    - 설정법 : 'App' 컴포넌트에서 `<SWRConfig value={설정값}>`으로 컴포넌트를 감싸줌
      - ex.
        ```
        // _app.tsx
        export default function App({ Component, pageProps }: AppProps) {
          return (
            <SWRConfig value={{fetcher: async (ulr: string) => await (await fetch(url)).json()}}>
              <Component {...pageProps} />
            </SWRConfig>
          );
        }
        // useUser.ts
        const { data, isLoading }= useSWR<IUserResponseType>("/api/users/me");
        ```
    - <a href="https://swr.vercel.app/ko/docs/global-configuration" target="_blank">공식문서</a>
- **24-01-25 : #11.0 ~ #11.4 / Product-page (1)**
  - [Prisma] 10개 이상의 인스턴스가 있다는 warning
    - `There are already 10 instances of Prisma Client actively running.`
    - 발생 이유 : NextJS는 수정 시 마다 hot reloading 되기 때문 (서버를 완전히 껐다 키지 않음)
    - 해결법
      - 첫 실행 시에는 'PrismaClient' 객체를 생성하고, 개방 중에 이미 있다면 'global' 객체의 프로퍼티의 할당
      - TypeScript 사용 시 type 설정을 해주어야 함
      - ex.
        ```
        import { PrismaClient } from "@prisma/client";
        declare global {
          var prismaClient: PrismaClient | undefined;
        }
        const prismaClient = global.prismaClient || new PrismaClient();
        if (process.env.NODE_DEV === "development") global.prismaClient = prismaClient;
        export default prismaClient;
        ```
    - <a href="https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices" target="_blank">공식문서</a>
  - DB 개발 순서
    1. model schema 생성
    2. DB 업데이트: `npx prisma db push`
    3. mutation: form 데이터를 Back-End로 전송하여, DB에 저장
    4. DB로부터 데이터를 fetch
  - [Prisma] 'Products' 모델 schema 생성
    - `String` 타입은 길이 제한이 있는데, 더 늘리고 싶으면 `@db.프로퍼티명`으로 옵션을 부여
    - ex.
      ```
      model Product {
        id          Int      @id @default(autoincrement())
        createdAt   DateTime @default(now())
        updatedAt   DateTime @updatedAt
        user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
        userId      Int
        imageUrl    String
        name        String
        price       Int
        description String   @db.MediumText
        @@index([userId])
      }
      ```
    - model schema 생성/수정 후, 터미널에 `npx prisma db push` 입력하여 동기화하기
  - [Prisma] 'Product' model 데이터를 DB에 저장
    - ex.
      ```
      async function handler(
        req: NextApiRequest,
        res: NextApiResponse<IProductUploadResponse>
      ) {
        const { name, price, description }: IProductUploadForm = req.body;
        const { user } = await getSession(req, res);
        // Upload 'product' to DB
        try {
          const product = await prismaClient.product.create({
            data: {
              name,
              price,
              description,
              imageUrl: "TEST",
              user: {
                connect: {
                  id: user?.id,
                },
              },
            },
          });
          return res.status(200).json({ ok: true, product });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ ok: false, error });
        }
      }
      ```
  - Back-End의 응답을 받아, Front-End에서 보여주기
    - 업로드페이지에서 form 데이터를 성공적으로 DB에 저장했다면, 해당 product 페이지로 이동시킬 것
    - ex.
      ```
      const router = useRouter();
      const [uploadProduct, { isLoading, data }] =
        useMutation<IProductUploadResponse>("/api/products");
      // <form> (react-hook-form)
      const { register, handleSubmit } = useForm<IProductUploadForm>();
      const onValid = (data: IProductUploadForm) => {
        if (isLoading) return alert("로딩 중 입니다.");
        uploadProduct(data);
      };
      // When finish uploading, Go to 'product detail' page
      useEffect(() => {
        if (data?.ok && data.product) {
          router.push(`/products/${data.product.id}`);
        }
      }, [data, router]);
      ```
  - DB로부터 데이터를 fetch하는 방법
    - REST API를 사용해 같은 주소로부터 GET, POST 방식으로 각각 다른 일을 하도록 만듦
    1. [Back-End] 'withHandler()' 커스텀 함수에서 method를 배열로 받게하기
       - ex.
         ```
         type Method = "GET" | "POST" | "DELETE";
         interface IWithHandlerProps {
           methods: Method[];
           handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
           isPrivate?: boolean;
         }
         // Check HTTP method in 'withHandler()' custom fn.
         if (req.method && !methods.includes(req.method as Method))
           return res.status(405).end();
         ```
    2. [Back-End] 핸들러 함수에서 `req.method`에 따라 각기 다른 일을 하도록 만들기
       - ex. `if (req.method === "GET") { ... }`
    3. [Back-End] 'GET' 방식일 때 DB로부터 특정 테이블 목록을 받아오기
       - 기본형 : `const 변수명 = await PRISMA클라언트.모델명.findMany({});`
    4. [Front-End] Back-End로부터 fetch하기
  - Product 상세 페이지 (/products/[id].tsx)
    1. [Front-End] dynamicURL의 쿼리값 받아오기
       - 기본형
         ```
         const 라우터변수 = useRouter();
         const { 쿼리변수명 } = 라우터변수.query;
         ```
    2. [Front-End] 해당 쿼리변수를 Back-End로부터 fetch하기
       - (라우터 마운트 시) 쿼리값이 'undefined -> 값'으로 변하기 때문에 주의 필요
         - 삼항연산자를 사용해 표현
         - ex. `` const { data } = useSWR(id ? `/api/products${id}` : null) ``
    3. [Back-End] 특정 Product 데이터를 DB로부터 받아오기
       - `req.query`를 통해 쿼리값을 받아옴
       - 데이터와 연결된 model의 전체 값을 가져오기 위해 `include: { 모델명: true }`를 사용
         - 특정 값만 가져오려면 `include: { 모델명: { select: { 컬럼명: true, ... } } }`
       - ex.
         ```
         const { id } = req.query;
         if (typeof id !== "string")
           return res
             .status(400)
             .json({ ok: false, error: "Only one dynamicParam is allowed" });
         const product = await prismaClient.product.findUnique({
           where: { id: +id },
           include: {
             user: {
               select: {
                 id: true,
                 name: true,
                 avatar: true,
               },
             },
           },
         });
         return res.status(200).json({ ok: true, product });
         ```
- **24-01-26 : #11.5 ~ #11.6 / Product-page (2)**
  - [Prisma] 연산자를 사용한 DB 검색 기능
    - DB에서 데이터를 검색 시 연산자를 이용해 특정 데이터를 가져올 수 있음
    - 비슷한 Product 이름을 가졌다면, similar items로 보여주려고 함
      - Product의 이름을 어절별로 나눈 후, 'OR' 연산자를 사용해 검색
      - ex.
        ```
        const terms = product.name
          .split(" ")
          .filter((word) => word !== "") // Except blank
          .map((word) => ({
            name: {
              contains: word,
            },
          }));
        const relatedProducts = await prismaClient.product.findMany({
          where: {
            OR: terms,
          },
        });
        ```
    - <a href="https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators" target="_blank">공식문서</a>
- **24-01-27 : #11.7 / Product-page (3)**
- **24-01-29 : #11.8 ~ #11.10 / Product-page (4)**
  - 관심상품(즐겨찾기) 기능 구현
    1. [Prisma] 관심상품 model schema 생성하기
       - ex.
         ```
         model Favorite {
           id        Int      @id @default(autoincrement())
           createdAt DateTime @default(now())
           updatedAt DateTime @updatedAt
           user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
           userId    Int
           product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
           productId Int
           @@index([userId])
           @@index([productId])
         }
         ```
    2. [Back-End] API Route 생성하기
       - 'Product Id'로 DB에 검색 ➡ 존재 시 삭제 / 미 존재 시 생성
       - DB 사용 시 unique한 값을 사용하지 않기 때문에 `.findFirst()` 메서드를 사용
         - `.findUnique()` 메서드 사용 불가
    3. [Front-End] 관심상품 클릭 시 UI 업데이트하기
       - 새로고침 시 해당 제품이 관심상품인지 아닌지 알아야하므로, 관심상품 필드도 DB로부터 가져와야 함
       - ex.
         ```
         const isLiked = Boolean(
           await prismaClient.favorite.findFirst({
             where: {
               productId: +id,
               userId: user.?id,
             },
             select: {
               id: true,
             },
           })
         );
         ```
    4. [Front-End] 즉시 실시간으로 UI 업데이트하기
       - Optimistic UI Update : Back-End에 요청을 보낸 후, 응답을 기자리지 않고 즉시 변경사항을 반영하는 것
         - 낙관적(optimistic)이며, UI에서 요청이 정상적으로 잘 수행했다고 가정
         - 새로고침 없이 즉시 바뀌어야 하므로, SWR패키지의 `mutate()`를 사용
       - 기본형
         ```
         const { mutate } = useSWR(URL주소);
         mutate({ 데이터, 재검증여부 });
         ```
         - 데이터 : 원하는 어떤 데이터든 상관없이 사용 ➡ 새로운 데이터로 덮어씌움
           - 사용자 화면 UI의 변경사항을 보여주기 위한 부분
         - 재검증여부 : [Boolean] 변경이 일어난 후, 다시 API에서 데이터를 불러올지 결정
           - true 시 SWR은 즉시 첫 번째 인자를 데이터로 갱신하고, 모든 UI가 변경된 이후에 백그라운드에서 SWR이 URL주소로 최신 데이터를 fetch함
       - ex.
         ```
         // Fetch 'Product'
         const { data, mutate } = useSWR<IProductDetailResponse>(
           id ? `/api/products/${id}` : null
         );
         // Click 'Favorite'
         const [toggleFav, { isLoading: isToggleLoading }] = useMutation(
           `/api/products/${id}/favorite`
         );
         const onFavoriteClick = () => {
           if (isToggleLoading || !data) return;
           toggleFav({}); // DB
           mutate({ ...data, isLiked: !data.isLiked }, false);
         };
         // 또는
         mutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
         ```
  - [SWR] `useSWR()`로부터 나온 데이터를 아무곳에서나 `mutate()`하는 방법
    - 기본형
      ```
      const { mutate } = useSWRConfig();
      mutate(키, 데이터, 재검증여부);
      ```
      - 키 : URL 주소
        - 인자로 키만 사용한다면, 새로 fetch하게 됨
      - 데이터 : 다른 컴포넌트의 데이터를 변경할 때는 화살표함수 형으로 작성
        - 자동으로 인자에 기존 데이터를 줌
    - 얽매인게 없기(unbounded) 때문에 변경시키려는 데이터를 정확하게 명시해야 함
    - ex.
      ```
      const { mutate } = useSWRConfig();
      mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
      ```
  - [Prisma] Product에 얼마나 많은 사람들이 Favorite을 눌렀는지 표시하는 방법
    - Product model에 Favorite model이 연결되어있어, 이것을 사용하면 됨
      - 새로운 컬럼을 생성해 직접 갯수를 지정하지 않아도 됨
      - ex.
        ```
        model Product {
          Favorites  Favorite[]
        }
        ```
    - 기본형
      ```
      const 변수명 = await PRISMA클라이언트.모델명.findMany({
        include: {
          _count: {
            select: {
              연결모델변수: true,
            },
          },
        },
      });
      ```
      - \_count : relation을 카운트해주는 프로퍼티
    - ex.
      ```
      const products = await prismaClient.product.findMany({
        include: {
          _count: {
            select: {
              Favorites: true,
            },
          },
        },
      });
      ```
- **24-01-31 : #12.0 ~ #12.3 / Community-page (1)**
  - 동네생활 페이지 생성
    1. [Prisma] model schema 생성하기
       - 질문(Post), 답변(Answer), 궁금해요(Wondering) model 생성
    2. [Front-End] Post를 작성하는 &lt;form&gt; 생성하기
       - 폼 제출 시 폼데이터는 Back-End로 전송
    3. [Back-End] DB에 Post를 저장하기
       - ex.
         ```
         const post = await prismaClient.post.create({
           data: {
             question,
             user: {
               connect: {
                 id: user.id,
               },
             },
           },
         });
         ```
    4. [Front-End] DB에 Post 저장 완료 시 해당 Post로 이동하기
       - ex.
         ```
         const router = useRouter();
         // Submit form
         const [post, { data, isLoading }] = useMutation<IWriteResponse>("/api/posts");
         const onValid = (formData: IWriteForm) => {
           if (isLoading) return alert("로딩 중 입니다.");
           post(formData); // DB
         };
         // Succeed post => Go this post
         useEffect(()=>{
           if (data?.post) {
             router.push(`/community/${data.post.id}`);
           }
         }, [data?.post, router]);
         ```
    5. [Front-End] 해당 Post 페이지 보여주기
    - ex. `` const { data, error } = useSWR<ICommunityPostRes>(id ? `/api/posts/${id}` : null); ``
  - 동네질문 즐겨찾기 설정
    1. [Back-End] DB로부터 즐겨찾기 여부 확인하기
       - 확인 후, 존재 시 삭제 / 미 존재 시 생성
    2. [Front-End] 즐겨찾기 이벤트에 대한 UI 업데이트하기
       - ex.
         ```
         const [wonder] = useMutation(`/api/posts/${id}/wonder`);
         const onWonderClick = () => {
           if (!data || !data.post) return;
           mutate(
             {
               ...data,
               post: {
                 ...data.post,
                 _count: {
                   ...data.post._count,
                   Wonderings: data.isWondering
                     ? data.post._count.Wonderings - 1
                     : data.post._count.Wonderings + 1,
                 },
               },
               isWondering: !data.isWondering,
             },
             false
           );
           wonder({}); // DB
         };
         ```
- **24-02-05 : #12.4 ~ #12.8 / Community-page (2)**
  - 동네질문 Post에 대한 Answer 생성
    1. [Front-End] Answer 폼 데이터를 Back-End로 전송하기
    2. [Back-End] Answer에 대한 DB 처리하기
       - 먼저, Post가 존재하는지 확인 ➡ 미 존재 시 404 상태코드 반환
    3. [Front-End] UI 업데이트하기
       - DB에 정상적으로 저장되었으면, form을 reset
    4. [Front-End] 실시간UI 처리하기
       - `useSWR()`의 `mutate`를 사용해 optimistic으로 처리해도 되지만, 데이터 양이 많기에 re-fetch하는 것이 나음
         - 인수없이 `mutate()`만 사용하면 됨
       - ex.
         ```
         useEffect(() => {
           if (answerData?.ok) {
            reset(); // reset form
            mutate(); // refetch
           }
         }, [answerData?.ok, reset, mutate]);
         ```
  - 게시글 작성 시 위치정보 첨부
    - 게시글 작성 시 위치정보와 함께 작성되도록 할 예정
    1. 사용 편의성을 위해 커스텀 hook을 생성
       - ex.
         ```
         interface IUseCoordsState {
           latitude: number | null;
           longitude: number | null;
         }
         export default function useCoords() {
           const [coords, setCoords] = useState<IUseCoordsState>({
             latitude: null,
             longitude: null,
           });
           const onSuccess = ({
             coords: { latitude, longitude },
           }: GeolocationPosition) => {
             setCoords({ latitude, longitude });
           };
           // Get user's coordination
           useEffect(() => {
             navigator.geolocation.getCurrentPosition(onSuccess);
           }, []);
           return coords;
         }
         ```
    2. [Prisma] Post model schema 변경하기
       - `latitude Float?, longitude Float?`를 추가
    3. [Front-End] 현재 좌표를 보내어 근방의 Post들만 fetch하기
       - Post 리스트를 fetch 시 현재 사용자가 위치한 좌표를 전송해야 함
         - 쿼리파라미터('?')를 이용 (Back-End에서 'req.query'로부터 가져옴)
         - ex.
           ```
           const { latitude, longitude } = useCoords();
           const { data, isLoading } = useSWR<IPostList>(
             latitude && longitude
               ? `/api/posts?latitude=${latitude}&longitude=${longitude}`
               : null
           );
           ```
    4. [Back-End] 특정 좌표 범위 내에 있는 Post만 찾기
       - 적절한 위치 반경을 설정해야 함
         - 특정 좌표의 ±0.01 정도가 적당함
         - 또는 사용자가 직접 반경을 지정할 수 있도록 함
       - DB 검색 시 where 조건문에서 연산자 옵션을 사용
         - gte : 크거나 같음 (greater then or equal)
         - lte : 크거나 같음 (less then or equal)
       - ex.
         ```
         where: {
           latitude: {
             gte: latitudeNumber - 0.01,
             lte: latitudeNumber + 0.01,
           },
           longitude: {
             gte: longitudeNumber - 0.01,
             lte: longitudeNumber + 0.01,
           },
         },
         ```
- **24-02-06 : #13.0 ~ #13.4 / Profile-page (1)**
  - _Update : [/api/users/me/records] API 리팩토링_
    - _model: Sale, Favorite, Purchase을 enum을 사용해 하나로 합쳐서 사용_
  - _Fix : [/api/enter.tsx] 로그인이 안 되는 현상 수정_
  - Review 데이터
    1. [Prisma] Review model schema 생성하기
       - 한 model이 다른 한 model을 2번 이상 가리키는 경우, 문제 발생
         - 가리키는 model에서 `name`을 생성하고, `fields`값을 중복되지 않게 바꿔서 사용
         - 가리켜지는 model에서 `@relation(name: 이름)` 옵션값을 추가
       - ex.
         ```
         model Review {
           id           Int      @id @default(autoincrement())
           createdAt    DateTime @default(now())
           updatedAt    DateTime @updatedAt
           review       String   @db.MediumText
           createdBy    User     @relation(name: "WrittenReviews",  fields: [createdById], references: [id], onDelete: Cascade)
           createdById  Int
           createdFor   User     @relation(name: "ReceivedReviews",  fields: [createdForId], references: [id], onDelete: Cascade)
           createdForId Int
           score        Int
           @@index([createdById])
           @@index([createdForId])
         }
         model User {
           WrittenReviews  Review[]    @relation(name: "WrittenReviews")
           ReceivedReviews Review[]    @relation(name: "ReceivedReviews")
         }
         ```
       - 이름만 다르고, 구조가 같은 model이 여러 개가 있다면 `enum`을 사용 가능
         - ex.
           ```
           model Record {
             ......
             kind  Kind
           }
           enum Kind {
             Purchase
             Sale
             Favorite
           }
           ```
         - 사용 시 where조건문에서 'kind'만 설정하면 됨
           - 하나의 API만 사용해도 되는 장점이 존재함
           - API 요청 시 쿼리파라미터('?')를 사용
             - ex. `/api/users/me/records?kind={kind}`
    2. [Back-End] 받은 Review 목록에 대한 API 생성하기
       - ex.
         ```
         const { user } = await getSession(req, res);
         const reviews = await prismaClient.review.findMany({
           where: {
             createdForId: user.id,
           },
           include: {
             createdBy: {
               select: {
                 id: true,
                 name: true,
                 avatar: true,
               },
             },
           },
         });
         return res.status(200).json({ ok: true, reviews });
         ```
  - [Prisma] 이미 존재하는 model에게 새로운 컬럼을 생성할 때의 문제
    - DB에 이미 존재하는 데이터는 새 컬럼의 값이 없기 때문에 문제가 발생
    - 해결법 (다음 중 택1)
      1. 모든 DB를 초기화하는 방법
      2. 새 컬럼의 값을 옵셔널로 지정
      3. 새 컬럼의 값에 기본값을 지정
         - 기본형: `@default(기본값)`
         - ex. `score Int @default(1)`
- **24-02-07 : #13.5 ~ #13.6 / Profile-page (2)**
  - 사용자 프로필 업데이트
    - react-hook-form 패키지의 `setValue`를 사용해 session의 사용자 정보를 미리 &lt;input&gt;에 넣어둠
    - Back-End에서 DB의 데이터와 중복 체크 후 업데이트하기
      - 새로운 프로필 내용만 가져다가 사용
        - ex. `const newName = name && name !== currentUser?.name ? name: undefined;`
      - DB로부터 unique한 컬럼값이 중복인지 확인
        - 중복 시 error
        - 미 중복 시 업데이트
- **24-02-13 : #14.0 ~ #14.6 / Streams**
  - 라이브 스트림 페이지 구현
    1. [Prisma] 라이브와 라이브챗메시지 model schema 생성하기
       - ex.
         ```
         model Stream {
           id          Int       @id @default(autoincrement())
           createdAt   DateTime  @default(now())
           updatedAt   DateTime  @updatedAt
           name        String
           description String    @db.MediumText
           price       Int
           user        User      @relation(fields: [userId], references:  [id], onDelete: Cascade)
           userId      Int
           Messages    Message[]
           @@index([userId])
         }
         model Message {
           id        Int      @id @default(autoincrement())
           createdAt DateTime @default(now())
           updatedAt DateTime @updatedAt
           message   String   @db.MediumText
           user      User     @relation(fields: [userId], references:  [id], onDelete: Cascade)
           userId    Int
           stream    Stream   @relation(fields: [streamId], references:  [id], onDelete: Cascade)
           streamId  Int
           @@index([userId])
           @@index([streamId])
         }
         ```
    2. [Front-End] 라이브를 시작하는 form 생성하기
       - react-hook-form 패키지의 `register`에서 `valueAsNumber: true` 옵션을 부여하면, 값이 number 형태가 됨
    3. [Back-End] DB에 저장하는 API 생성하기
       - ex.
         ```
         const { name, price, description }: ICreateLiveForm = req.body;
         const stream = await prismaClient.stream.create({
           data: {
             name,
             price,
             description,
             user: {
               connect: {
                 id: user.id,
               },
             },
           },
         });
         ```
    4. [Front-End] DB로부터 데이터를 fetch하기
  - 라이브 채팅 시스템에서 실시간 같은 기능 구현
    1. [Back-End] Stream model을 가져올 때, `include`를 사용해 Message model도 가져오기
       - ex.
         ```
         const stream = await prismaClient.stream.findUnique({
           where: {
             id: +id,
           },
           include: {
             Messages: {
               select: {
                 id: true,
                 message: true,
                 user: {
                   select: {
                     id: true,
                     avatar: true,
                   },
                 },
               },
             },
           },
         });
         ```
    2. [Front-End] Message 리스트로부터 메시지 가져오기
       - ex.
         ```
         {data?.stream?.Messages.map((msg) => (
           <Message
             key={msg.id}
             text={msg.message}
             reversed={msg.user.id === user?.id ? true : false}
           />
         ))}
         ```
    3. [Front-End] 눈속임으로 사용자가 보낸 메시지를 실시간으로 구현하기
       - NextJS는 serverless이기 때문에 실시간을 만들 수 없음
         - 웹소켓서버를 이용해야지 실시간 구현 가능
       - `mutate()`를 사용해 re-fetch하는 방법
         - 인수를 사용하지 않으면, re-fetch를 함
       - 가짜 데이터 트릭을 사용하는 방법
         - `mutate(데이터, 재확인여부)`를 사용해 폼데이터를 추가함
         - ex.
           ```
           mutate(
             (prev) =>
               user &&
               prev?.stream && {
                 ...prev,
                 stream: {
                   ...prev.stream,
                   Messages: [
                     ...prev.stream.Messages,
                     {
                       id: Date.now(),
                       message: formData.message,
                       user: {
                         id: user.id,
                         avatar: user.avatar,
                       },
                     },
                   ],
                 },
               },
             false
           );
           ```
    4. [Front-End] `useSWR()`의 `refreshInterval`옵션을 사용해 자동으로 fetch하여 실시간으로 보이도록하기
       - 기본형 : `useSWR(URL주소, { refreshInterval: 밀리초 });`
  - [Prisma] seeding
    - 초기 데이터를 DB에 삽입하는 프로세스
      - 주로 개발 및 테스트 목적으로 사용
      - App을 처음으로 설정하거나 새로운 개발 환경을 구성할 때, DB에 테스트용 데이터를 채우는 데 사용
    - 사용법
      1. 파일 생성하기
         - 파일명 : `prisma/파일명.ts`
         - ex.
           ```
           import { PrismaClient } from "@prisma/client";
           const prismaClient = new PrismaClient();
           async function main() {
             [...Array.from(Array(500).keys())].forEach(async (item) => {
               const stream = await prismaClient.stream.create({
                 data: {
                   name: String(item),
                   description: String(item),
                   price: item,
                   user: {
                     connect: {
                       id: 11,
                     },
                   },
                 },
               });
               console.log(`${item}/500`);
             });
           }
           try {
             main();
           } catch (error) {
             console.log(error);
           } finally {
             () => prismaClient.$disconnect();
           }
           ```
      2. `ts-node` 패키지 설치하기
         - 설치법 : `npm i ts-node`
      3. 스트립트 생성하기
         - 'package.json' 파일에서 생성
           - ex.
             ```
             "prisma": {
               "seed": "ts-node prisma/파일명.ts"
             }
             ```
           - `npx prisma db seed`라는 명령어를 통해 실행 가능해짐
         - `Cannot use import statement outside a module` 에러 발생 시
           - `"ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/파일명.ts"`로 수정
    - <a href="https://www.prisma.io/docs/guides/database/seed-database" target="_blank">공식문서</a>
  - [Prisma] DB에 연결하는 갯수 설정
    - 기본형 : DB URL에 `?connection_limit=연결갯수`를 입력하여 사용
    - 그 외에도 다른 옵션들 설정 가능
  - [Prisma] pagination
    - DB로부터 데이터를 가져올 때, 여러 페이지로 나누어 한 번의 일정량의 데이터만 표시하는 방법
    - 옵션 기본형
      - `take` : [number] 가져올 데이터 갯수
      - `skip` : [number] 건너뛸 데이터 갯수
    - 관계된 다른 model(include)에서도 사용 가능하며, 응답에 포함시킬 경우 pagination을 권장
      - DB 사용 시 최소한의 데이터만 가져오는 것이 좋음
        - pagination과 select를 사용하는 것을 권장
    - Front-End에서는 state변수와 쿼리파라미터('?')를 사용해 Back-End에 전송
- **24-02-14 : Infinite scroll pagination (1)**
  - _ISSUE : ✅ [/pages/streams/index.ts] 무한스크롤을 사용한 pagination_
    - ~~고려사항 : react-query 도입? SWR로 잘 되지 않음~~
      - ~~useSWRInfinite()를 사용하자니 isLoading이 바뀌지 않아 runtime error~~
      - ~~useSWR()를 사용하자니, 불분명 원인에 의해 같은 데이터를 2번씩 fetch되는 문제 => key 중복 문제, 게다가 다른 페이지에 갔다가 돌아오면 제대로 동작하지 않음. 이 방법은 아닌듯.~~
- **24-02-15 : Infinite scroll pagination (2)**
  - _UPDATE : 무한스크롤을 사용한 pagination_
    - _최대한 SWR 패키지를 이용해 구현하기_
    - _'react-infinite-scroller' 패키지가 문제 있는 게 아닐까?_
      - _2년 전부터 패키지 업데이트가 없음 ➡️ 다른 방법 모색_
    - _'react-intersection-observer' 패키지 사용하기_
  - _ISSUE : ✅ 첫 동작, 스크롤 동작 시 2번씩 실행되는 문제_
    - _FIX : 동작 여부의 boolean 변수를 생성하고, 동작 후 setTimeout()을 사용해 일정시간동안 막아둠_
    - _<a href="https://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=qna_html&wr_id=216727" target="_blank">참고자료</a>_
  - _ISSUE : ✅ 더 이상 불러올 데이터가 없음에도 불구하고, 계속 시도함_
    - _원인 : `useSWRInfinite()`의 `isLoading`과 `isValidating` 때문_
    - _FIX : `setSize()`의 조건을 inView와 스크롤가능여부(boolean)만 사용_
      - _isLoading과 isValidating 제거_
  - 무한스크롤을 사용한 pagination
    - `useSWRInfinite()`을 사용한 데이터 fetch
      - pagination을 하기 편하게 도와주는 hook
        - 여러 개의 데이터를 배열에 담아서 줌
      - 사용법
        ```
        const { data, size, setSize, isValidating, isLoading 등 } = useSWRInfinite<데이터제네릭>(getKey함수, ?Fetcher함수, ?옵션);
        const getKey = (pageIndex: number, prevData: 데이터제네릭) => {
          if (prevData && !prevData.length) return null; // Reached the end
          return `URL주소?쿼리파라미터=${pageIndex}`;
        };
        ```
      - <a href="https://swr.vercel.app/docs/pagination" target="_blank">공식문서</a>
      - <a href="https://2mojurmoyang.tistory.com/237#5.10.%20%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98" target="_blank">참고자료</a>
  - react-intersection-observer 패키지
    - React App에서 Intersection Observer API를 쉽게 사용할 수 있도록 도와주는 패키지
      - 요소가 뷰포트(화면)에 들어오거나 나갈 때 알려줌
        - 요소의 가시성과 관련된 이벤트를 처리하는 데 편리한 컴포넌트와 hook을 제공
      - Intersection Observer API
        - 브라우저에서 제공하는 기능으로, 요소들의 교차 영역(intersection)을 비동기적으로 감시할 수 있게 해주는 기능
        - 요소들이 화면에 보이는지 여부를 쉽게 감지하고, 그에 따른 작업을 수행 가능
    - 설치법 : `npm i react-intersection-observer -D`
    - 사용법 : `const { ref, inView 등 } = useInView();`
      - `ref` : 참조 요소, ref 프로퍼티에 할당
      - `inView` : [Boolean] 참조 요소가 화면에 보이는지의 여부
    - <a href="https://www.npmjs.com/package/react-intersection-observer" target="_blank">공식문서</a>
    - <a href="https://velog.io/@resyve/SWR%EB%A1%9C-%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%EB%82%9C%EC%9D%B4%EB%8F%84-%EC%A4%91%ED%95%98" target="_blank">참고자료</a>
  - 무한스크롤 pagination ex.
    ```
    /* Custom hook */
      export default function useInfiniteScroll<T = any>(url: string) {
        const [isScrollLoading, setIsScrollLoading] = useState(true);
        const [isKillScroll, setIsKillScroll] = useState(false);
        // Prevent duplicate runs at the first time
        // ! 데이터가 없는 경우, 2번 동작함
        useEffect(() => {
          setTimeout(() => setIsScrollLoading(false), 1000);
        }, []);
        // Fetch data
        const getKey = (pageIndex: number, prevData: T) => {
          if (prevData && (prevData as any).ok === false) {
            setIsKillScroll(true);
            return null; // if 'ok: false', Reached the end
          }
          return `${url}?page=${pageIndex}`;
        };
        const { data, setSize, isLoading, isValidating } = useSWRInfinite<T>(getKey);
        // Scroll fn.
        const { ref, inView } = useInView(); // Watch viewport
        useEffect(() => {
          if (inView && !isScrollLoading && !isKillScroll) {
            setIsScrollLoading(true);
            setSize((prev) => prev + 1);
            setTimeout(() => setIsScrollLoading(false), 1000); // Prevent duplicate runs
          }
        }, [inView, isScrollLoading, setSize, isKillScroll]);
        return { data, ref, isLoading: isLoading || isValidating };
      }
    /* In use */
      const { data, ref, isLoading } =
        useInfiniteScroll<IStreamsResponse>("/api/streams");
      return (
        <section>
          {(data ?? []).map((page) =>
            page.streams?.map((stream) => (
              <Link
                href={`/streams/${stream.id}`}
                key={stream.id}
              >
                <h1>{stream.name}</h1>
              </Link>
            ))
          )}
        </section>
        {isLoading ? <div>Loading..</div> : null}
        <div ref={ref} />
      );
    ```
- **24-02-16 : #15.0 ~ #15.8 / Cloudflare Images**
  - Cloudflare
    - 인터넷에 연결하는 모든 것을 안전하고 비밀을 유지하면서, 신속하고 안정적으로 연결하도록 설계된 전역 네트워크
  - Cloudflare Images API
    - 대규모로 이미지를 저장, 크기 조정, 최적화하는 하나의 API
      - 이미지 인프라를 구축하고 유지하는 효율적인 솔류션을 제공함
      - 하나의 통합 제품을 이용해 이미지를 대규모로 저장, 크기 조정, 최적화 함
    - 요금제
      - 저장 : 5 달러 / 10만 개
      - 전송 : 1 달러 / 10만 개
      - 대역폭 요금이 없어서 이미지 용량에 신경쓰지 않아도 됨
      - 크기 조정, 최적화에 추가 요금 x
  - react-hook-form에서 `input:file` 다루는 방법
    1. file을 제출하는 `register` 생성하기
       - 타입은 `FileList`를 사용
       - ex.
         ```
         {...register("avatar", {
           validate: {
             isImage: (value) =>
               (value && value[0].type.includes("image")) ||
               "이미지 파일만 업로드 가능합니다.",
           },
         })}
         ```
    2. file 변경을 감지하는 이벤트 리스너 생성하기
       - 이미지 파일이 변경된다면, 화면에 미리보기로 보여주기
         - `useForm()`의 `watch()`를 사용해 변경을 감지
         - `watch(?INPUT명)` : form의 변경을 감지할 수 있음
       - ex.
         ```
         const avatar = watch("avatar");
         useEffect(()=>{
           if (avatar && avatar.length > 0) {
             const file = avatar[0];
           }
         }, [avatar]);
         ```
    3. file의 URL을 알아내기
       - file을 선택하고나면 browser의 memory에 저장되므로, 해당 URL주소를 알아내야 함
       - 기본형 : `URL.createObjectURL(파일변수);`
         - 'blob' 글자를 포함한 URL주소를 사용해야 함
    4. 미리보기 이미지 제공하기
       - `useState()`를 이용해 &lt;img&gt;의 src로 제공
       - ex.
         ```
         const [avatarPreview, setAvatarPreview] = useState("");
         const avatar = watch("avatar");
         useEffect(()=>{
           if (avatar && avatar.length > 0) {
             const file = avatar[0];
             setAvatarPreview(URL.createObjectURL(file));
           }
         },[avatar]);
         return {avatarPreview ? <img src={avatarPreview} /> : null}
         ```
  - Cloudflare 이미지 업로드
    - [콘솔] image dashboard를 사용하는 방법
      - 관리자 권한이 있는 사람만 사용 가능
    - [코드] API token을 사용하는 방법
      - client ➡️ server ➡️ Cloudflare 순으로 업로드를 하기 때문에, 불필요하게 server에서 사용해 대역폭을 낭비하는 문제
    - [코드] Direct Create Upload 방법 ✅
      - 사용자의 browser가 Cloudflare에 직접 업로드하는 방법
        - 사용자의 이미지를 직접 다루지않아, 비용절감
      - 보안URL을 통해 업로드 (token을 노출하지 않음)
        - 실행 방식
          1. 사용자가 파일 업로드 요청
          2. [Back-End] API key와 함께 Cloudflare에 요청
          3. Cloudflare는 빈 파일 URL(1회용)을 Back-End에 걸쳐 사용자에게 전달
          4. 사용자는 해당 URL을 통해 Cloudflare에 직접 파일 업로드
        - 사용자가 파일을 업로드하지 않을 시 30분 뒤에 자동으로 URL이 삭제됨
      - 사용법 (먼저 번들 구매)
        1. 'images - 개요 - API 사용'에서 API token 얻기
           - 커스텀 token 생성 후, .env파일에 저장
             - 권한 : 계정 / Cloudflare Images / 편집
           - 계정 ID도 .env파일에 저장
        2. [Back-End] Cloudflare URL 요청하기
           - 기본형
             ```
             const 변수명 = (await (
               await fetch(
                 `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
                 {
                   method: "POST",
                   headers: {
                     Authorization: `Bearer ${process.env.CF_TOKEN}`,
                   },
                 }
               )
             ).json());
             ```
           - 사용자는 URL주소를 통해 이미지를 저장
        3. [Front-End] form을 사용해 Cloudflare URL로 파일 업로드하기
           - 기본형
             ```
             const 변수명 = new FormData();
             변수명.append(키명, 값, ?파일명);
             // 파일명 미 입력 시 원래 파일명으로 대체
             ```
           - 업로드의 결과로 주어지는 `id`를 통해 Cloudflare에 접근가능하므로, DB에 저장해야 함
           - ex.
             ```
             // Ask for Cloudflare URL
               const cloudflareUrl = await (await fetch("/api/files")).json();
             // Error handling
               if (!cloudflare.ok) return;
             // Submit form with avatar file to Cloudflare
               const form = new FormData();
               form.append("file", avatar[0]);
               try {
                 const uploadAvatar = (await (
                   await fetch(cloudflareUrl.url, {
                     method: "POST",
                     body: form,
                   })
                 ).json());
               } catch (error) {
                 return alert("Fail: ", error);
               }
             ```
    - <a href="https://developers.cloudflare.com/images/upload-images/direct-creator-upload/" target="_blank">공식문서</a>
  - Cloudflare 이미지 가져오는 방법
    - [콘솔] 이미지 제공 URL을 복사하여, src로 사용하기
      - 기본형 : `https://imagedelivery.net/<계정해시>/<image_id>/<variant_name>`
        - 계정해시 : 콘솔에서 확인가능
        - image_id : 사용자 DB를 통해 가져와 사용
        - variant_name : 리사이징값, 원본은 `public`으로 입력해 사용
    - ex.
      ```
      const = { user } = useUser(); // 세션으로부터 사용자 정보 가져오기
      {user?.avatar ? (
        <img
          src={`https://imagedelivery.net/<계정해시>${user?.avatar}/public`}
        />
      ) : null}
      ```
  - Cloudflare 이미지 리사이징(re-size, 크기 조정)
    - 작은 곳에 큰 이미지가 사용되면 낭비이기 때문에 리사이징을 사용함
      - Cloudflare가 무료로 자동적인 리사이징을 제공함
    - 설정법 : [콘솔] 'Images-변형'에서 새로운 &lt;variant_name&gt; 생성 및 편집
      - Scale down : 비율의 맞춰 이미지의 크기를 맞춤
      - Contain : 비율에 맞춰 이미지의 크기를 가능한 맞춤
      - Cover : 비율에 맞춰 딱 원하는 이미지의 크기를 맞추나, 튀어나온 부분은 자름
      - Crop : 비율 상관없이 딱 원하는 이미지의 크기를 맞춤
      - Pad : 비율에 맞춰 이미지의 크기를 맞추며, 남는부분에 흰색 padding 적용
    - 사용법 : 이미지를 가져올 때 `<variant_name>` 부분에서 변수를 사용
- **24-02-20 : #16.0 ~ #16.1 / NextJS Images (1)**
  - NextJS에서의 이미지
    - HTML &lt;img&gt; 대신 NextJS image component(next/image)를 사용해야 함
      - 무료로 이미지 최적화를 할 수 있기 때문
    - 장점
      1. lazy loading
         - 사용자는 이미지가 나올 때까지 스크롤하지 않으면, 이미지를 load하지 않음
           - 모든 이미지를 즉시 download 하지 않음
      2. placeholder
         - local 이미지 로딩 시 이미지가 흐리게 보이다가 load 됨
           - 이미지 로딩 시 블러처리 된 placeholder 이미지를 제공
  - 이미지 파일 종류
    - local image : 'public' 폴더 내에 존재하는 이미지 파일
      - API 응답 전에 framework가 인지하는 이미지
    - remote image : API 응답으로부터 가져오는 이미지 파일
      - local image만큼 최적화되지 않음 (파일 시스템에 없기 때문)
  - Local image의 &lt;Image&gt; 사용법
    - 기본형
      ```
      import Image from "next/image";
      import 이미지변수 from "public/이미지경로";
      <Image src={이미지변수} />
      ```
    - 옵셔널 프로퍼티
      - `placeholder=blur` : 로딩 시 블러치리 된 placeholder 이미지를 사용
      - `quality` : [백분율] 이미지 품질 (기본값 75)
      - `width` : [px] 이미지 가로크기
      - `height` : [px] 이미지 세로크기
    - NextJS가 자동으로 src URL을 만듦 (inspect에서 확인 가능)
      - 이미지를 압축하기 때문 (\_next/image API handler로 부터)
      - src URL : '/\_next/image?URL핸들러'
        - `q` : [백분율] 품질
    - <a href="https://nextjs.org/docs/pages/building-your-application/optimizing/images#local-images" target="_blank">공식문서</a>
- **24-02-21 : #16.2 ~ #16.4 / NextJS Images (2) + [Challenge] Chat system (1)**
  - _FIX : [무한스크롤] 데이터가 없는 경우, 2번 동작함 해결_
    - _조건없는 1초 후 `setTimeout()`을 조건부로 변경_
    ```
    useEffect(() => {
      if (data && (data as any)[0].ok)
        setTimeout(() => setIsScrollLoading(false), 1000);
    }, [data]);
    ```
  - _UPDATE : 모든 &lt;img&gt;태그를 &lt;Image&gt;태그로 변경_
  - Remote image의 &lt;Image&gt; 사용법
    1. [설정] 이미지를 가져오는 API의 `hostname` 도메인을 추가하기
       - `next.config.js` 파일에서 구성
       - 기본형
         ```
         const nextConfig = {
           images: {
             remotePatterns: [
               {
                 protocol: 프로토콜,
                 hostname: 호스트명,
                 port: 포트,
                 pathname: 경로명,
               },
             ],
           },
         };
         module.exports = nextConfig;
         ```
       - ex.
         ```
         const nextConfig = {
           reactStrictMode: true,
           images: {
             remotePatterns: [
               {
                 protocol: "https",
                 hostname: "imagedelivery.net",
                 port: "",
                 pathname: "/<path_name>/**",
               },
             ],
           },
         };
         ```
    2. 이미지 크기를 명시하기
       - `width`, `height` 프로퍼티를 사용
         - lazy loading을 하기 위해 필요함
         - 실제 이미지 크기가 아닌, 보여지길 원하는 크기를 명시
       - 이미지의 크기를 제대로 모를 때 `fill={true}` 프로퍼티를 사용
         - 화면에 꽉 차는 absolute 이미지를 가지므로, relative 컨테이너와 함께 사용
         - `object-fit` CSS 프로퍼티와 함께 사용하는 것을 권장
           - 컨터이너의 내부 이미지가 보여지는 방식을 설정
         - ex.
           ```
           <div className="relative w-full h-96">
             <Image
               src={getImage(data.product.imageUrl, "public")}
               alt="product image"
               className="object-contain"
               fill={true}
             />
           </div>
           ```
       - 이미지 소스는 실제 이미지가 아닌, NextJS가 만든 이미지
    - <a href="https://nextjs.org/docs/pages/building-your-application/optimizing/images#remote-images" target="_blank">공식문서</a>
  - remote image의 blur placeholder
    - blur placeholder는 local image에 대해서만 제공함
    - remote image 사용 시 blur image를 가지고 있다면, `blurDataURL` 프로퍼티를 사용
      - `placeholder="blur"`와 결합하여 사용한 경우에만 적용됨
      - base64로 인코딩된 이미지여야 함
      - 확대하여 흐려지므로, 10px 이하를 권장
        - 더 큰 이미지를 사용 시 App 성능이 저하될 수 있음
  - _[Challenge] 채팅방_
    - _[prisma] model schema 작성하기_
      - _채팅방, 채팅유저, 채팅_
    - _[Back-End] 채팅방 생성하기_
      - _상품id, 판매자id, 구매희망자id를 통해 채팅방을 특정_
      - _존재여부 확인 후, 채팅방으로 입장_
        - _미 존재 시 채팅방 생성 후 입장_
          - _DB생성 : 채팅방, 채팅유저1, 채팅유저2_
        - _존재 시 이미 존재하는 채팅방 입장_
- **24-02-23 : [Challenge] Chat system (2)**
  - _개인방_
    - _가장 최근 채팅을 10개 씩 pagination_
      - _내림차순으로 정렬_
      - _더보기 버튼을 클릭 시 데이터를 더 불러오고, 불러올 데이터가 없을 시 (가장 최근 불러온 데이타가 10개 미만) 버튼 숨김_
    - _채팅 입력 시 `mutate()`를 사용해 즉시 UI에 보여줌_
  - _채팅방 리스트_
    - _가장 최신 채팅방을 위로 정렬_
    - _각 채팅방의 최신 채팅과 시간을 미리 보여줌_
      - _`timeago.js` 패키지를 사용해 상대적인 시간을 표현_
- **24-02-24 : [Challenge] Chat system (3)**
  - _채팅방 권한_
    - _사용자가 URL에 직접 입력 시의 문제_
      1. _해당 채팅방이 존재하는지_
      2. _채팅방에 사용자가 포함되어 있는지_
      - _채팅방 번호가 존재하고, 해당 채팅방에 본인이 포함되어 있는지 검사_
    - _권한과 상대방의 이름을 같이 가져와서 사용_
      - _미 권한 시 채팅방 리스트로 replace_
- **24-02-25 : [Challenge] Chat system (4)**
  - _채팅방 목록에 대한 무한스크롤 pagination 구현_
- **24-02-27 : #19.0 ~ #19.5 / NextJS deep dive (1)**
  - _FIX_
    - _[community] timeago 시간 및 아바타 이미지 설정_
    - _[link-profile.tsx] 아바타 이미지 추가_
  - Middlewares
    - 요청(request)과 종착지 중간에 있는 함수
      - API Route에서도 작동함
    - 사용법
      1. middleware 파일 생성하기
         - `/middleware.ts` 또는 `/src/middleware.ts` 파일을 생성
      2. middleware 작성하기
         - 기본형
           ```
           import type { NextRequest, NextFetchEvent } from "next/server";
           export function middleware(req: NextRequest, ev: NextFetchEvent) {
             ......
           }
           ```
    - NextJS의 middleware는 모든 요청에서 발생하지만, 페이지 하나를 불러올 때 마다 발생되는 관련 static파일 요청들이 있음
      - 매칭되는 URL에서만 middleware를 발생시키는 방법
        ```
        export const config = {
          matcher: ["/((?!api|_next/static|favicon.ico).*)"],
        };
        ```
    - 특정 페이지에서만 작동하는 방법
      - 기본형 : `if (request.nextUrl.pathname.statsWith("경로")) { ... }`
    - 사용자 기기정보
      - 기본형
        ```
        import { userAgent } from "next/server";
        const 변수명 = userAgent(요청변수);
        ```
      - 브라우저, 사용기기, 운영체제, CPU, Bot유무 등을 알 수 있음
      - ex.
        ```
        // Bot인 경우, 접속을 차단하고 해당 문구를 보여줌
        if (userAgent(req).isBot) {
          return new Response("No bot", { status: 403 });
        }
        ```
    - `NextResponse` 변수를 통해 `.redirect()`, `.rewrite()`, `.json()` 등 반환 가능
      - 현재 URL 정보를 복사(`req.nextUrl.clone()`)한 후 사용해야 함
      - 항상 return문에서 사용할 것
    - 사용자의 쿠키를 확인하는 방법
      - 기본형 : `req.cookie`
      - 특정 쿠키를 가져오는 방법 : `req.cookie.has(쿠키명)` [Boolean]
      - 'iron-session'의 `getIronSession()`을 통해 세션쿠키를 가져올 수 있음
      - ex.
        ```
        // Check logged-in user using session
        const isCookie = req.cookie.has("carrot-session");
        const { user } = getIronSession<IIronSessionData>(
          req,
          NextResponse.next(), // res
          sessionOptions
        );
        const isUser = Boolean(isCookie && user);
        if (!isUser && !req.nextUrl.pathname.startsWith("/enter")) {
          const url = req.nextUrl.clone();
          url.pathname = "/enter";
          return NextResponse.rewrite(url);
        }
        ```
    - `req.geo`를 통해 사용자의 위치정보를 얻을 수 있음
      - 특정 지역을 차단하거나 허용 가능
    - <a href="https://nextjs.org/docs/app/building-your-application/routing/middleware" target="_blank">공식문서</a>
  - Dynamic imports
    - import문을 최상단에서 선언한다면, 해당 컴포넌트를 즉시 사용여부와 상관없이 download 함
    - 즉시 사용하지 않는 컴포넌트는 사용할 때 download하여, App의 로딩시간을 최적화
      - NextJS의 Dynamic imports를 이용해 사용 가능
      - Lazy loading
    - 사용법
      ```
      import dynamic from "next/dynamic";
      const 컴포넌트명 = dynamic(() => import(경로), { ?옵션 });
      ```
      - 옵션
        - `srr` : 서버단에서의 로딩 유무를 설정
          - 몇몇 라이브러리나 패키지는 서바단에서 로딩하는 게 불가능 (에러)
        - `loading` : 로딩 중에는 보여지는 커스텀 컴포넌트
          - 사용법 : `loading: () => 컴포넌트`
        - `suspense: true` : React 18에서 지원하는 로딩 중 보여지는 커스텀 컴포넌트
          - 사용법
            ```
            <Suspense fallback={로딩 중에 보여줄 것}>
              <다이나믹컴포넌트 />
            </Suspense>
            ```
        - `loading` 또는 `suspense`(선호)를 사용
    - 주의 사항
      - 모든 컴포넌트를 dynamic 하지는 말 것 (App을 다 만든 후, 최적화 시 사용할 것)
      - 컴포넌트의 크기가 크고 사용자의 인터넷이 느리다면, 다운로드 시간이 많이 걸릴 것
  - 커스텀 document 컴포넌트 (`_document.tsx`)
    - NextJS App의 HTML 뼈대를 만드는 역할
      - 서버에서 한 번만 실행
      - `_app.tsx`는 App의 청사진이며, 사용자가 페이지를 불러올 때마다 브라우저에서 실행됨
    - &lt;html /&gt;, 폰트, SEO 등 설정 가능
    - 파일명 : `/src/_document.tsx`
    - 기본형 (필수 컴포넌트)
      ```
      import { Html, Head, Main, NextScript } from "next/document";
      export default function Document() {
        return (
          <Html lang="ko">
            <Head />
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        )
      }
      ```
      - `<Main />` : App 컴포넌트를 rendering 함
    - 폰트 최적화 방법
      - 'google fonts'에서 원하는 폰트의 &lt;link&gt;를 &lt;Head&gt; 내에 입력하기
        - 'google fonts'에서 제공하는 폰트를 기반으로 NextJS 폰트 최적화가 가능
        - build 시 자동으로 최적화 (개발단계에서는 최적화 x)
          - 사용자가 다운받아야할 파일을 `@font-face`로 만들어 주므로, 사용자가 다운받을 필요 x
    - 외부 script를 추가하는 방법
      - 기본형: `<Script src="경로" />`
      - `strategy` 프로퍼티 : script를 불러올 타이밍을 정할 수 있음
        - `beforeInteractive` : 페이지를 다 불러와서 상호작용을 하기 전에 script를 불러옴
        - `afterInteractive` : [기본값] 페이지를 다 불러온 후, script를 불러옴 (대부분의 경우)
        - `lazyOnLoad` : 다른 모든 데이터나 소스들을 불러오고 나서야 script를 불러옴
      - `onLoad` 프로퍼티 : script를 불러온 후, 실행되는 콜백함수
    - <a href="https://nextjs.org/docs/pages/building-your-application/routing/custom-document" target="_blank">공식문서</a>
- **24-02-28 : #19.6 ~ #19.15 / NextJS deep dive (2)**
  - getServerSideProps (SSR)
    - 페이지 컴포넌트가 서버단에서만 rendering 됨
      - `getServerSideProps`에서 반환된 데이터를 사용하여, 각 요청에서 이 페이지를 미리 rendering 함
    - 사용자의 요청이 발생할 때 마다 동작
    - 기본형
      ```
      export async function getServerSideProps(ctx: NextPageContext) {
        return {
          props: {}, // 페이지 컴포넌트에 props로 전송
        }
      }
      ```
    - 장점
      1. 로딩 상태를 보여주지 않음
      2. 소스코드 내부에 정보가 담김
      3. GET 요청 API handler를 굳이 만들지 않아도 됨 (DB 직접 사용 가능)
    - 단점
      - 페이지를 알아서 새로고침 해주는 패키지(SWR 등)를 사용 불가
        - static optimization 이나 cache 등을 사용 불가
      - error 시 사용자는 UI를 볼 수 없음
    - `Date` 타입 등을 읽지 못하는 경우, `JSON.parse(JSON.stringify(변수명))`을 사용해 반환
    - <a href="https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props" target="_blank">공식문서</a>
  - SSR + SWR 패키지
    - `useSWR()` 실행 전 미리 cache를 제공하여, cache가 있는 상태로 시작
      - client에서는 `useSWR()`을 그대로 사용 가능
    - export default인 컴포넌트로 getServerSideProps의 props가 전달 됨
    - 기본형
      ```
      function 페이지컴포넌트() { ... }
      export default function 컴포넌트명(SSR로부터받는props) {
        return (
          <SWRConfig
            value={{
              fallback: {
                "경로1": 데이터값1,
                "경로2": 데이터값2,
              },
            }}
          >
            <페이지컴포넌트 />
          </SWRConfig>
        )
      }
      export function getServerSideProps() { ... }
      ```
    - ex.
      ```
      function Home() {
        const { data } = useSWR<IProductList>("/api/products");
        ......
      }
      export default function Page({ data }: { data: IProductList }) {
        return (
          <SWRConfig
            value={{
              fallback: {
                "/api/products": data,
              },
            }}
          >
            <Home />
          </SWRConfig>
        )
      }
      export async function getServerSideProps() {
        try {
          const products = await prismaClient.product.findMany({});
          return {
            props: {
              data: {
                ok: true,
                products: JSON.parse(JSON.stringify(products)),
              },
            },
          };
        } catch (error) {
          console.log(error);
          return {
            props: {
              data: {
                ok: false,
                error,
              },
            },
          };
        }
      }
      ```
    - <a href="https://github.com/helious23/max-market/blob/5ed8d03e3ed9b5fb0e898f16a7558b778434618b/pages/index.tsx#L59" target="_blank">무한스크롤 참고용</a>
  - SSR + Authentication
    - `getServerSideProps()`의 인자로부터 `context` 값을 가져올 수 있음
      - 타입 : `NextPageContext`
      - ex.
        ```
        import { getIronSession } from "iron-session";
        export async function getServerSideProps({ req, res }: NexPageContext) {
          const session = await getIronSession<제네릭>(
            req!,
            res!,
            세션옵션
          );
          ......
        }
        ```
    - 개인화된 사용자 데이터 또느 요청 시에만 알 수 있는 정보에 의존하는 페이지를 렌더링해야 하는 경우, `getServerSideProps`를 사용해야 함
      - ex. 승인 헤더 또는 위치 정보
    - 요청 시 데이터를 가져올 필요가 없거나 데이터와 미리 렌더링된 HTML을 캐시하기를 선호하는 경우, `getStaticProps`를 사용하느 것이 좋음
  - getStaticProps (SSG)
    - 정적(static) 웹사이트를 만들어주게 하는 기능
      - 정적(static) : 데이터가 바뀌지 않는 것 (API fetch x)
    - `getStaticProps`를 사용해야하는 상황
      - 페이지를 rendering하는 데 필요한 데이터는 사용자의 request보다 먼저 build 타임에서 이용가능해야 함
      - 데이터는 헤드리스 CMS에서 가져옴
      - 데이터를 공개적으로 cache 가능
      - 페이지는 SEO를 위해 미리 렌더링되어야 하고, 매우 빨라야 함
      - `getStaticProps`는 성능을 위해 CDN에서 cache할 수 있는 HTML 및 JSON 파일을 생성함
    - `getServerSideProps`는 사용자의 요청이 발생할 때 마다 동작하지만, `getStaticProps`는 딱 한 번만 실행됨
      - build 시 페이지를 export한 후 일반 HTML이 될 때
    - DB 또는 .md 파일 등을 이용해 정적 페이지 생성 가능
    - 기본형
      ```
      export async function getStaticProps(ctx: GetStaticPropsContext) {
        return {
          props: {},
        },
      }
      ```
  - gray-matter 패키지
    - .md파일의 front-matter를 파싱하는 패키지
    - front-matter : .md파일의 최상단에 위치한 메타데이터 블록
      - 기본형
        ```
        ---
        원하는키명: 원하는값
        ---
        ```
    - 설치법 : `npm i gray-matter -D`
    - 기본형
      ```
      import matter from "gray-matter";
      matter(파일변수, { ?옵션 });
      ```
    - 데이터 형태
      ```
      {
        content: 내용,
        data: {
          키명: 값,
        }
        isEmpty: 불리안값,
        excerpt: 값,
      }
      ```
    - `getStaticProps`와 함께 사용해 .md파일을 이용한 정적페이지를 생성 가능
      - ex.
        ```
        interface IBlogProps {
          posts: {
            title: string;
            date: string;
            category: string;
          }[];
        }
        export default function Blog({ posts }: IBlogProps) {
          return (
            <h1>Latest Posts :</h1>
            <ul>
              {posts.map((post, idx) => (
                <li key={idx}>
                  <p>{post.title}</p>
                  <span>{post.date} / {post.category}</span>
                </li>
              ))}
            </ul>
          );
        }
        export async function getStaticProps() {
          // normal node.js
          const blogPosts = readdirSync("src/posts").map((file) => {
            const content = readFileSync(`src/posts/${file}`, "utf-8");
            return matter(content).data;
          });
          return {
            props: {
              posts: blogPosts,
            },
          };
        }
        ```
    - <a href="https://www.npmjs.com/package/gray-matter" target="_blank">공식문서</a>
  - getStaticPaths
    - 정적 경로(static path)를 생성하기 위해 사용되는 메서드
      - 동적인 URL을 갖는 페이지에서 `getStaticProps`를 사용할 때 필요함
    - dynamic params는 동적인 페이지라서 변수의 값이 무한하지만, 정적인 페이지에서는 따로 유한한 값(몇 개의 페이지를 갖는지)을 명시해야 함
      - 미리 HTML 페이지를 생성해야하기 때문
    - 기본형
      ```
      export function getStaticPaths() {
        return {
          paths: 배열값,
          fallback: 불리안값,
        };
      }
      ```
      - `paths` : `{ params: { 동적변수: 값 } }[]` 형태이어야 함
      - `fallback` : 미리 build된 페이지가 없는 경우, NextJS가 동적 페이지를 생성하는 방법을 제어하는 옵션
        - false : 미리 정의된 경로 이외의 요청은 404 페이지를 반환
        - true : 미리 정의된 경로 이외의 쵸엉에 대해 동적으로 페이지를 생성하고, 해당 페이지를 캐싱함
          - 사용자가 요청한 페이지에 대해 동적으로 생성된 페이지를 제공 가능
        - "blocking" : 미리 정의된 경로 이외의 요청에 대해 동적으로 페이지를 생성하지만, 요청이 발생할 때까지 build를 차단함
          - 장점 : 요청에 대한 응답을 기다리지 않고 미리 정의된 경로에 대한 페이지를 build할 수 있음
          - 단점: 많은 양의 동적 페이지가 있는 경우 서버 부하를 초래함
    - `getStaticProps()`의 `context`가 `getStaticPaths()`가 return하는 각각의 `path`들을 호출함
      - 기본형 : `ctx.params?.동적변수명`
  - remark-html 패키지
    - Markdown을 파싱하고 HTML로 변환하는 패키지
    - 설치법 : `npm i remark-html remark-parse unified`
    - 기본형
      ```
      import remarkHtml from "remark-html";
      import remarkParse from "remark-parse";
      import { unified } from "unified";
      const 파일변수 = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(md파일내용);
      ```
    - ex.
      ```
      // [slug].tsx
      interface IPostProps {
        post: string;
      }
      export default function Post({ post }: IPostProps) {
        return <div>{post}</div>;
      }
      export function getStaticPaths() {
        const files = readdirSync("src/posts").map((file) => {
          const [name, _] = file.split(".");
          return { params: { slug: name } };
        });
        return {
          paths: files,
          fallback: false,
        };
      }
      export async function getStaticProps(ctx: GetStaticPropsContext) {
        const { content } = matter.read(`src/posts/${ctx.params?.slug}.md`);
        const { value } = await unified()
          .use(remarkParse)
          .use(remarkHtml)
          .process(content);
        return {
          props: {
            post: value,
          },
        };
      }
      ```
    - <a href="https://www.npmjs.com/package/remark-html" target="_blank">공식문서</a>
  - InnerHTML
    - React가 자동으로 텍스트가 HTML 코드라면 실행시키지 않음
    - 신뢰할 수 있는 데이터(변수)를 HTML로 바꾸는 방법
      - 요소에서 `dangerouslySetInnerHTML={{ __html: 변수 }}`
      - style 적용이 안 되어있기 때문에 CSS 스타일링을 해야함
    - 일반 CSS에서 Tailwind를 사용하는 방법
      - 기본형 : `선택자 { @apply Tailwind문법 }`
      - ex.
        ```
        .blog-post-content h1 {
          @apply mb-5 text-red-500;
        }
        <div className="blog-post-content" />
        ```
- **24-03-01 : #20.0 ~ #20.7 / ISR (Incremental Static Regeneration)**
  - ISR (Incremental Static Regeneration; 단계적 정적 재생성)
    - 데이터가 포함된 페이지를 불러올 때 CSR 또는 SSR 방식을 택해야 함
    - ISR 방식은 `getStaticProps`처럼 페이지를 미리 정적인 상태로 변환시키나, build 시에만 적용되는 단점을 개선한 방식
      - 정적 페이지를 백그라운드에서 개별적으로 몇 번이고 다시 생성시킬 수 있음
      - Front단에서 ReactJS코드(fetch)가 필요하지 x
    - 장점
      1. 페이지 로딩 상태가 전혀 나타나지 않음
      2. 서버단에서 페이지를 rendering하지 않아도 됨
         - 사용자가 요청할 때 마다 서버단에서 실행 x
      3. 표시되는 데이터는 가장 최신 데이터
         - 사실은 백그라운드에서 생성한 캐싱된 HTML 페이지를 표시
    - 기본형
      ```
      export async function getStaticProps() {
        return {
          props: {},
          revalidate: 초단위,
        }
      }
      ```
      - `revalidate` : [초단위] 정적 페이지의 재생성 주기
    - 사용자가 아닌 웹사이트가 기준이며, 주기적으로 데이터를 업데이트하여 static 페이지를 제공
    - 일반적으로 ISR이 SSR 보다 DB를 적게 사용함
      - ISR이 캐싱된 정적 페이지를 제공하는 동안 DB에 접근할 필요가 없기 때문
    - <a href="https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration" target="_blank">공식문서</a>
  - ODR (On-Demand Revalidation)
    - 수동(사용자 요청)으로 `getStaticProps`를 API handler로 작동 가능
      - 모든 페이지를 HTML로 제작 가능
    - 기존의 ISR에서 정적 페이지를 재생성할 수 있는 방법은 사용자가 `revalidate` 시간 이후에 페이지를 방문하는 것
    - 기본형 : API handler에서 `await res.revalidate(URL경로)`
      - ODR 사용 시 ISR의 `revalidate`는 사용하지 않아도 됨
    - 무분별하게 ODR을 실행하는 것을 막기위해 ODR API에 비밀 token을 추가하여 사용할 것
      - `rewrites()`를 사용해 Front단에서 token을 가림
    - <a href="https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation" target="_blank">공식문서</a>
  - 동적 경로(dynamic params)에서의 ISR 사용
    - 미리 알 수 없는 params에 대해 정적 페이지를 설정하여 사용
    - 사용법
      1. 동적 페이지를 정적 페이지(getStaticProps)로 바꾸기
      2. 정적 경로(getStaticPaths) 설정하기
         - build 시 모든 DB의 데이터를 가져오는 것은 좋은 방법이 아님
         - `getStaticPaths`에서 빈 배열의 경로들을 반환하고, 사용자의 요청에 따라 미리 만들도록 함
         - 기본형
           ```
           export function getStaticPaths() {
             return {
               paths: [],
               fallback: "blocking",
             }
           }
           ```
           - `fallback: "blocking"` : getStaticPaths를 가지는 페이지에 방문 시 해당 HTML파일이 없다면, 사용자를 잠시 기다리게 한 뒤 백그라운드에서 페이지를 생성한 후 보여줌
             - 서버단에서 실행되며, 첫 실행 시 딱 한 번만 일어남
           - `fallback: true` : "blocking"처럼 작동하지만, 로딩 중에도 화면을 보여줌
             - `useRouter().isFallback` 조건문을 통해 로딩 중 화면을 보여줄 수 있음
- **24-03-04 : [Challenge] ISR (Incremental Static Regeneration)**
  - _[Challenge] `/community/[id].tsx`를 정적 페이지로 만들기_
    - _`getStaticProps`(SSG)를 사용해 대부분의 데이터를 가져옴_
      - _궁금해요, 댓글 데이터 변경 시 `await res.revalidate(경로)`를 실행하여, 정적 페이지 갱신_
      - _동적 URL에 대해 `getStaticPaths` 사용_
        ```
        export const getStaticPaths: GetStaticPaths = () => {
          return {
            paths: [],
            fallback: "blocking",
          };
        };
        ```
    - _`isWondering` 부분은 사용자(session)마다 값이 다르므로, 이것만 CSR 방식으로 가져옴_
      - _정적 페이지에서는 req, res, session 등 사용 불가_
    - _mutate_
      - _궁금해요 : `useSWR()`의 `mutate()` 사용_
      - _댓글 : `댓글배열.push()`_
    - _ISSUE : 상대시간(timeago.js 등)에 대해 client와 server간 콘텐츠 불일치 에러 발생_
      - _FIX : `<time dateTime={시간값} suppressHydrationWarning>값</time>`_
      - _ex._
        ```
        <span className="text-xs font-normal text-gray-500 block">
          <time dateTime={answer.createdAt} suppressHydrationWarning>
            {formatTime(answer.createdAt, true)}
          </time>
        </span>
        ```
      - _<a href="https://nextjs.org/docs/messages/react-hydration-error" target="_blank">공식문서</a>_
    - _궁금해요, 댓글 등 상호작용 요소가 많기 때문에 정적페이지 사용이 별로인 것 같음_
      - _오히려 DB 사용량이 더 많은 것 같음_
        - _요청 시 마다 '궁금해요' DB를 사용함_
        - _댓글, 궁금해요 POST 시 DB 사용 및 `res.revalidate()`_
      - _**SSR 방식**을 사용하기로 결정_
- **24-03-06 : #21.0 ~ #21.5 / React 18**
  - _FIX_
    - _[profile/edit] 아바타 이미지를 교체하지 않을 시 error 수정_
  - _UPDATE_
    - _[/community/[id].tsx]를 SSR 페이지로 만들기_
    - _SSR + SWR인 경우, error 페이지 핸들링_
    - _[enter] token 로직 업데이트_
      _1. 해당 사용자의 모든 token을 삭제 후, 새로운 토큰을 생성_
      _2. 사용자의 method(email, phone)와 난수가 일치 시 로그인_
      - _난수를 unique로 할 필요 없음 (method가 unique값이기 때문)_
  - suspense
    - 코드에서 loading 상태를 나타내는 부분을 제거할 수 있게 해주는 API
      - loading 상태에 대해 신경쓰지 않아도, 사용자가 loading 상태 화면을 볼 수 있음
    - 주의사항
      - SSR, SSG 등과 함께 사용 불가 (CSR에서만 사용 가능)
      - 개발자가 사용한다고 되는 게 아니라, 라이브러리에서 기능을 지원해줘야 함
    - 장점 : 이미 데이터가 있다고 가정 하에 코드를 짤 수 있음
      - if문을 사용해 데이터를 체크할 필요가 없음
    - (SWR 사용 시) 페이지 전체인 경우
      - 기본형
        ```
        import dynamic from "next/dynamic";
        function 화면컴포넌트() {
          <SWRConfig value={{ suspense: true }}>
            <Suspense fallback={로딩컴포넌트}>
              <페이지컴포넌트 />
            </Suspense>
          </SWRConfig>
        }
        export default dynamic(async () => 화면컴포넌트, { ssr: false });
        ```
      - 모든 SWR 요청이 끝날 때 까지 기다린 후, 컴포넌트를 렌더링 해줌
    - (SWR 사용 시) 컴포넌트인 경우
      - 페이지에서 useSWR()를 사용하면 안 됨
      - 기본형
        ```
        const 컴포넌트명 = () => {
          const { data, isLoading } = useSWR(경로);
          return ......
        }
        export default function 페이지컴포넌트명() {
          return (
            <Suspense fallback={로딩컴포넌트}>
              <컴포넌트명 />
            </Suspense>
          )
        }
        ```
  - Server Components (RSC; React Server Components)
    - 서버 컴포넌트는 client에서 JavaScript를 전혀 사용하지 않아도 생성 가능
      - 사용자가 JavaScript를 로딩하지 않아도 됨 ➡️ 빠름, SSR은 아님
      - 서버가 컴포넌트들을 rendering 한 후, 사용자에게 결과물만 보여줌
        - 컴포넌트에서 서버관련 일(DB 등)을 할 수 있을 것
    - NextJS의 App Router에서는 기본적으로 Server Components를 사용함
      - 필요 시 Client Components를 사용 가능
    - 설치법 : `npm i next@latest react@rc react-dom@rc`
    - 설정법 : 'next.config.js'파일에서 `experimental` 프로퍼티 추가하기
      ```
      module.exports= {
        experimental: {
          reactRoot: true,
          runtime: "nodejs",
          serverComponents: true,
        },
      }
      ```
    - 사용법
      1. `파일명.server.tsx`로 파일명 변경하기
      2. Suspense를 사용해 결과물만 화면에 반환하기
    - <a href="https://nextjs.org/docs/app/building-your-application/rendering/server-components" target="_blank">공식문서</a>
- **24-03-07**
  - _UPDATE_
    - _[token] 토큰의 유효기간으로 3분 설정_
    - _[/products/[id]] SSR + SWR로 변경_
    - _[404] 동적URL에서 data가 없을 시 404 반환_
- **24-03-08**
  - _UPDATE_
    - _[form] useForm register의 검증 옵션 및 error 메시지 추가_
    - _[/user/profile/[id]] 사용자 프로필 페이지 생성 (SSG)_
    - _[user/edit] 프로필 이미지 갱신 시 cloudflare에서 기존 이미지 삭제_
      - _기본형_
        ```
        await fetch(
          `https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/<IMAGE_ID>`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer <API_TOKEN>`,
            },
          }
        );
        ```
      - _<a href="https://developers.cloudflare.com/api/operations/cloudflare-images-delete-image" target="_blank">공식문서</a>_
    - _[product/[id]] 수정/삭제 기능 추가_
    - _favicon_
  - _FIX_
    - _[chats/[id]] 프로필 링크 수정_
- **24-03-09**
  - _UPDATE_
    - _[Font] 폰트 적용_
      - next/font는 모든 글꼴 파일에 자동적으로 자체 호스팅이 내장되어 있음
      - 레이아웃 쉬프트 없이 폰트를 사용 가능
      - 구글 폰트에 요청을 보내지 않음
      - 기본형
        ```
        import { 폰트명 } from "next/font/google";
        const 변수명 = 폰트명({
          subsets: ["latin"],
          display: "swap",
        });
        <요소 className={변수명.className} />
        ```
      - _<a href="https://nextjs.org/docs/app/building-your-application/optimizing/fonts" target="_blank">공식문서</a>_
      - _<a href="https://velog.io/@dusunax/next.js-google-font-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0feat.-tailwind" target="_blank">참고자료</a>_
    - _[product/edit] 프로필 이미지 갱신 시 cloudflare에서 기존 이미지 삭제_
    - _[SEO] 모든 페이지에 &lt;title&gt; 적기_
    - _[/api/users/me/index.ts] POST부분 리팩토링_
      - _업데이트할 컬럼들을 한 객체에 담은 후, 한 번에 업데이트_
    - _[무한스크롤] 홈(SSR), 동네생활(SSR), 채팅, 라이브(SSR), 판매내역(SSR), 구매내역(SSR), 관심목록(SSR)_
      - `useSWRInfinite()`의 옵션
        - `revalidateFirstPage` : [boolean] 첫페이지 재검증 여부 (기본값 true)
        - `fallbackData` : [T[] | undefined] 첫페이지의 초기데이터
      - ex.
        ```
        const { data, setSize, isLoading, isValidating } = useSWRInfinite<T>(getKey함수, {
          revalidateFirstPage: false,
          fallbackData: 초기데이터 ? [초기데이터] : undefined,
        });
        ```
- **24-03-10**
  - _UPDATE_
    - _[community/[id]] 댓글 pagination_
  - _FIX_
    - _[chats/[id]] pagination 이벤트 버튼 활성화 조건 수정_
- **24-03-11**
  - _UPDATE_
    - _[채팅방] 채팅방 삭제 및 물건 post 삭제 기능 구현하기_
      - _구매자 or 판매자가 대화 종료 시_
        - _채팅방 관련만 삭제_
  - ~~_TODO_~~
    - ~~_[채팅방] 구매자가 구매 완료 시_~~
      - ~~_채팅방, 물건 관련 전부 삭제하기_~~
      - ~~_판매내역(판매자), 구매내역(구매자) 추가하기_~~
      - ~~_?? product를 삭제하면 cascade때문에 다 삭제됨_~~
        - ~~_isSoldOut 같은 boolean 값을 추가해야 하나?_~~
- **24-03-14**
  - _UPDATE_
    - _[DB] 'records' 로직 다시 및 구현하기 (구매내역, 판매내역)_
      - _삭제 시 cascade를 하지 않 새로운 model 생성하여 적용_
  - _TODO_
    - _[product] 판매종료내역 관련_
- **24-03-15**
  - _UPDATE: [chats/[id]]_
    - _현재 거래중인 물품의 link 추가_
    - _물건 구매 확정 시 review 기능(옵션) 업데이트_
  - _ISSUE_
    - _[api/products/[id]] product "DELETE" 시 product와 record 간의 관계 때문에 에러_
      - _record와 product 간의 관계를 끊어내고, 일일이 저장하는 방식으로 해야하나? (model 수정)_
- **24-03-16**
  - _FIX_
    - _[chats/[id]] 구매 확정 시 product 이미지 삭제 (CloudFlare)_
    - _[DB] Record 모델과 Product 모델 간의 관계를 끊음_
- **24-03-18 : #22.0 ~ #22.6 / Deploy**
  - _[middleware] 특정 지역 차단하기_
    - _`req.geo`를 사용_
    - _호스팅 시 데이터를 제공받을 수 있음_
- **24-03-23 : Open graph**
  - crawler-user-agents 패키지
    - 단일 JSON 파일처럼 로봇, 크롤러 및 스파이더가 사용하는 HTTP 사용자 에이전트 목록이 포함되어있는 패키지
    - 설치법 : `npm i crawler-user-agents -D`
    - 사용법
      ```
      import crawlers from "crawler-user-agents";
      if (RegExp(entry.pattern).test(req.headers['user-agent'])) { ... }
      ```
    - ex.
      ```
      // Defend from unknown bot
      const userAgentInfo = userAgent(req);
      if (
        userAgentInfo.isBot &&
        !crawlers.some((entry) => RegExp(entry.pattern).test(userAgentInfo.ua))
      ) {
        return new Response("No bot", { status: 403 });
      }
      ```

---

- To-Do
  - [Token] 한 토큰에 대해 여러 번 시도하는 것을 막기
  - [/enter] 소셜 로그인 구현하기 (NextAuth)
  - 로그아웃 구현하기
