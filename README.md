# 송상헌 웹 이력서 (web-resume-songsh)

Next.js(App Router)로 만든 공개 이력서 사이트입니다. `/ko`, `/en` 두 언어로 제공되며, 데이터 파일만 고치면 페이지가 바뀝니다. PRD v2.0의 공개 페이지 요구사항(P-01~P-06, P-09) 중 정적 사이트로 가능한 범위를 구현했습니다. 관리자 콘솔·경력 원장·AI 생성은 Supabase 연결 후 다음 단계에서 올립니다.

## 폴더 구조

```
app/[locale]/layout.tsx   언어별 레이아웃, 메타 태그·hreflang·OG (SEO)
app/[locale]/page.tsx     이력서 페이지
app/globals.css           디자인 토큰(색·폰트), 인쇄(PDF) CSS
app/sitemap.ts, robots.ts 검색엔진용 sitemap / robots
components/ResumeView.tsx 이력서 렌더링 (번역 폴백 포함)
components/TopBar.tsx     언어 전환 + PDF 저장 버튼
data/resume.ts            ★ 이력서 본문 데이터 (여기만 고치면 됨)
data/projects.ts          ★ 프로젝트 목록 (과정 중 하나씩 추가)
data/types.ts             데이터 타입 정의
data/ui.ts                화면 문구(한/영)
```

## 1. 내 정보 수정하기

1. `data/resume.ts`를 열어 "입력 필요"로 표시된 값(학력 기간, 자격증 취득일 등)을 채웁니다.
2. 경력이 생기면 `experience` 배열에 항목을 추가합니다. 비어 있으면 섹션이 자동으로 숨겨집니다.
3. 연락처를 숨기려면 `contactVisibility`에서 `email`·`phone`을 `false`로 바꿉니다.
4. 국내용 증명사진을 쓰려면 `public/photo.jpg`를 넣고 `photo: "/photo.jpg"` 주석을 해제합니다. 영문 페이지에서는 자동으로 숨겨집니다.

## 2. 프로젝트 추가하기

`data/projects.ts`의 `projects` 배열 맨 위에 항목을 추가합니다. 파일 안에 주석으로 템플릿이 있습니다.

- `results`에는 실제로 측정한 수치만 적습니다. 숫자를 지어내지 않습니다.
- `en`을 비워 두면 영문 페이지에 한글 원문이 "KO" 배지와 함께 표시됩니다(번역 폴백).
- `visible: false`로 두면 공개 페이지에서 숨겨집니다.

## 3. 로컬에서 실행하기

아래 명령은 프로젝트 폴더 안에서 터미널(PowerShell 또는 명령 프롬프트)에 입력합니다.

| 명령어 | 한글 설명 |
| --- | --- |
| `npm install` | package.json에 적힌 라이브러리(Next.js, React 등)를 `node_modules` 폴더에 내려받습니다. 처음 한 번, 그리고 라이브러리를 바꿨을 때 실행합니다. |
| `npm run dev` | 개발 서버를 켭니다. 브라우저에서 http://localhost:3000 을 열면 보이고, 파일을 저장할 때마다 자동으로 새로고침됩니다. 끄려면 Ctrl+C. |
| `npm run build` | 배포용으로 사이트를 컴파일합니다. 타입 오류나 문법 오류가 있으면 여기서 멈추므로, 배포 전에 한 번 실행해 확인합니다. |
| `npm run start` | `build`로 만든 결과물을 실제 서비스처럼 실행합니다(배포 전 최종 확인용). |

## 4. Vercel에 배포하기

가장 쉬운 방법은 GitHub에 올린 뒤 Vercel에서 가져오는 것입니다. 이후에는 `git push`만 하면 자동으로 재배포됩니다.

### 4-1. GitHub에 올리기

| 명령어 | 한글 설명 |
| --- | --- |
| `git init` | 이 폴더를 Git 저장소로 만듭니다(처음 한 번). |
| `git add .` | 변경된 모든 파일을 커밋 대상으로 담습니다. (`.gitignore` 덕분에 node_modules는 제외됩니다.) |
| `git commit -m "첫 배포"` | 담아 둔 변경을 "첫 배포"라는 메시지로 기록합니다. |
| `git branch -M main` | 기본 브랜치 이름을 main으로 맞춥니다. |
| `git remote add origin https://github.com/<아이디>/web-resume.git` | GitHub에 만든 빈 저장소 주소를 원격(origin)으로 등록합니다. |
| `git push -u origin main` | 로컬 기록을 GitHub로 올립니다. 이후에는 `git push`만 쓰면 됩니다. |

### 4-2. Vercel에서 가져오기 (웹 화면)

1. https://vercel.com 에 GitHub 계정으로 로그인합니다.
2. "Add New… → Project"를 누르고 방금 올린 저장소를 Import 합니다. 프레임워크는 Next.js로 자동 인식됩니다.
3. Environment Variables에 `PUBLIC_SITE_URL` = `https://<프로젝트이름>.vercel.app` 을 추가합니다. (sitemap·hreflang의 절대 주소에 쓰입니다. 커스텀 도메인을 붙이면 그 주소로 바꿉니다.)
4. Deploy를 누르면 1~2분 뒤 주소가 나옵니다. `https://<프로젝트이름>.vercel.app/ko` 로 확인합니다.

### 4-3. 터미널로 배포하기 (선택)

| 명령어 | 한글 설명 |
| --- | --- |
| `npm i -g vercel` | Vercel 명령줄 도구를 전역 설치합니다(처음 한 번). |
| `vercel login` | 브라우저가 열리며 Vercel 계정에 로그인합니다. |
| `vercel` | 현재 폴더를 미리보기(preview) 주소로 배포합니다. 질문이 나오면 Enter로 기본값을 선택합니다. |
| `vercel --prod` | 실제 서비스(production) 주소로 배포합니다. |

## 5. 프로젝트를 추가한 뒤 다시 배포하기

| 명령어 | 한글 설명 |
| --- | --- |
| `git add .` | 바뀐 파일(예: data/projects.ts)을 담습니다. |
| `git commit -m "프로젝트 p002 추가"` | 변경 내용을 기록합니다. |
| `git push` | GitHub로 올립니다. Vercel이 감지해 자동으로 다시 배포합니다. |

## 6. PDF로 저장하기

페이지 상단 "PDF 저장" 버튼을 누르면 브라우저 인쇄 창이 열립니다. 대상을 "PDF로 저장"으로 고르면 상단 바·버튼·배지가 빠진 A4 레이아웃으로 저장됩니다.

## 7. 다음 단계 (PRD 기준)

- Supabase 연결 후 관리자 콘솔(/admin): 로그인, 섹션 편집, 디자인 편집, 번역 편집기
- 경력 원장과 AI 생성 엔진(공고 분석 → 선별 → 재표현 → 검증)
- 일본어(ja) 추가: `data/types.ts`의 `Locale`과 `data/ui.ts`에 ja를 추가하면 됩니다.
