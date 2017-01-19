<h3 id="1npminit">1. npm init</h3>
<h1 id="1java26">[^1]Java (2/6) <!-- 주석부분--!></h1>
<h2 id="522">5장 배열 (2/2)</h2>
<h3 id="564">5.6.4 배열의 초기값</h3>
<table>
<thead>
<tr>
<th>데이터 타입</th>
<th>초기값</th>
</tr>
</thead>
<tbody>
<tr>
<td>byte[]</td>
<td>0</td>
</tr>
<tr>
<td>char[]</td>
<td>'\u0000'</td>
</tr>
<tr>
<td>short[]</td>
<td>0</td>
</tr>
<tr>
<td>int[]</td>
<td>0</td>
</tr>
<tr>
<td>long[]</td>
<td>0L</td>
</tr>
<tr>
<td>float[]</td>
<td>0.0F</td>
</tr>
<tr>
<td>double[]</td>
<td>0.0</td>
</tr>
<tr>
<td>boolean[]</td>
<td>false</td>
</tr>
<tr>
<td>클래스[]</td>
<td>null</td>
</tr>
<tr>
<td>인터페이스[]</td>
<td>null</td>
</tr>
</tbody>
</table>
<p>[^1]: 수업 교재로는 <strong>&lt;이것이 자바다></strong> (신용권 저, 한빛미디어)를 사용한다.</p>
<p>시작하기 앞서 <a href="https://nodejs.org/ko/">nodejs</a>가 기본적으로 설치되어 있어야함을 말씀드립니다. (너무당연한걸 얘기한건가요?) <br/>
현재 예제는 6.9.2로 진행중이지만, 다른 버전이라도 크게 문제는 없도록 진행할 예정이니 공식 홈페이지에서 LTS 버전을 바로 받아서 설치하시면 될것 같습니다. <br/>
nodejs 모듈를 만들 것이기 때문에 my-cli이란 이름의 폴더 하나를 생성하여 해당 폴더에서 터미널로 <code>npm init</code>을 실행시킵니다.
<code>
npm init
</code></p>
<p><img src="./images/npminit.png" alt="npm init" /></p>
<p>엔터만 계속 쳐도 상관없지만 원하는 설정값이 있다면 하나씩 입력하셔도 무방합니다. <br/>
<code>npm init</code>으로 <strong>package.json</strong>이 생성되었다면 바로 다음 단계로 넘어가시면 됩니다.</p>
<h3 id="2">2. 커맨드 라인 옵션 파싱하기</h3>
<p>npm이나 다른 node 모듈들을 사용할 때 보면 여러 옵션을 주면서 스크립트를 실행시키는 것이 기억나시나요? <br/>
이렇게 커맨드라인 입력시 사용되는 옵션을 쉽게 구현하도록 도와주는 모듈이 바로 <a href="https://github.com/tj/commander.js">commander.js</a>입니다. <br/>
바로 설치와 사용을 해보겠습니다.</p>
<p><code>
npm install --save commander
</code>
그리고 프로젝트 폴더에 app.js 파일을 하나 만들어 보겠습니다. <br/>
현재까지의 프로젝트 구조는 아래와 같습니다.</p>
<p><img src="./images/프로젝트구조.png" alt="프로젝트구조" /></p>
<p>(폴더구조) <br/></p>
