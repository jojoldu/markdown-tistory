# 마크다운으로 작성한 내용을 티스토리로 전송하기

### 현재 진행 상황
* access token 발급 가능
* access token으로 티스토리에 글 게시 가능
* 마크다운 텍스트 HTML로 전환
* 디렉토리+파일명으로 되어있는 문자열 추출해서 파일명만 남기기 가능

### 예정
* 글로벌 모듈 설치 방식으로 변경
  - 실행한 디렉토리 내에 있는 마크다운 파일 인식하기
  - 해당 마크다운 파일 이름을 게시글 타이틀로 지정하기
* 마크다운 텍스트에 포함된 이미지 파일 티스토리에 업로드
  - 마크다운 텍스트에 포함된 이미지 파일명 추출
  - 마크다운 텍스트에 포함된 이미지 파일들 추출하여 티스토리에 전송
  - 전송하여 나온 결과 (즉, 티스토리에 저장된 이미지의 이름)을 마크다운 텍스트의 기존 이미지 코드와 교체
  
### 참고
* [티스토리 API](http://www.tistory.com/guide/api/post)
* [Nodejs Path 가이드](https://nodejs.org/api/path.html#path_windows_vs_posix)
* [Global Module 생성](https://bretkikehara.wordpress.com/2013/05/02/nodejs-creating-your-first-global-module/)