#1. 유니티 인터페이스

기본적인 유니티 인터페이스 설정을 해보고 살펴보자

---
###초기화면 셋팅
유니티 프로젝트를 열면 다음과 같은 모습이다.

<p align = "center">
<img width="1167" alt="스크린샷 2021-12-30 오후 3 34 33" src="https://user-images.githubusercontent.com/68016394/147740459-ca72cfaf-5c8a-43d0-8346-1217deb1004b.png"/>
초기화면
</p>

이제 우측 상단의 'Default'라고 되어 있는 부분을 클릭해서 '2 by 3'로 바꿔주고
'Project' 탭을 'Hierarchy' 탭 아래부분으로 이동하자.

그리고 상단 맥북 메뉴에서 Windows > General > Console을 눌러 콘솔창을 띄운 뒤
'Inspector' 탭 아래에 넣어주어 기본적인 레이아웃 세팅을 완료하자.

<p align="center">
<img width="1174" alt="image" src="https://user-images.githubusercontent.com/68016394/147740630-123620ec-1511-4288-8a0d-58c5ae7cedf9.png"/>
완료된 모습
</p>

위의 화면은 유니티에서 가장 많이 사용되는 메인 창 6개이며 좌측 위 사진부터 시계방향으로 다음과 같이 부른다.

**1. 씬**: 게임 월드인 씬을 시각적으로 편집하는 창

**2. 하이어라키**: 씬에 존재하는 모든 게임 오브젝트가 나열

**3. 인스펙터**: 선택한 오브젝트의 정보가 표시

**4. 콘솔**: 로그나 에러가 표시

**5. 프로젝트**: 프로젝트에 사용될 asset들이 표시
(asset: 개발에 사용되는 모든 형태의 파일)

**6. 게임**: 플레이어가 실제로 보게 될 화면

---

###console 창 설명

아무래도 실제로 개발하다보면 디버깅이 가장 중요하기에 따로 정리해본다

<p align="center">
<img width="500" alt="image" src="https://user-images.githubusercontent.com/68016394/147742237-3be108a4-7ebc-4264-963b-e372e73db4fd.png"/>
console창 출력 설정 탭
</p>

**1. Clear**: 모든 로그 삭제, 미해결 로그는 제외

**2. Clear on Play**: 씬을 플레이하기 전까지의 로그 삭제

**3. Clear on Build**: 빌드 직전까지의 로그 삭제

**4. Collapes**: 같은 종류의 로그끼리 보기 쉽게 묶음

**5. Error Pause**: 플레이 도중 에러 발생시 씬 일시 정지

**6. Editor**: 유니티 에디터 외부의 기기에서 로그를 받아옴

---
###툴바와 씬 편집

####1) 툴바

유니티 에디터 창의 좌측 상단에 툴바 메뉴들이 있다

<p align="center">
<img width="225" alt="image" src="https://user-images.githubusercontent.com/68016394/147742860-042b81e4-4235-4d99-89fe-59b56d5de04f.png"/>
<br>
툴바 메뉴
</p>

좌측부터 

**1. Hand**: 씬 카메라 이동

**2. Translate**: 오브젝트 이동

**3. Rotate**: 오브젝트 회전

**4. Scale**: 오브젝트 크기 조정

**5. Rect**: UI 및 2D 오브젝트 크기 조정

**6. Transform**: 평행이동, 회전, 스케일 툴을 하나로 합친 툴

**7. Custom editor**: 복잡한 개인 맞춤 툴 사용 가능

커스텀을 제외한 6개의 툴은 *qwerty*로 단축키 사용 가능!

####2) 씬 편집

-마우스 휠 스크롤로 줌아웃/줌인 가능

-Hand 툴로 카메라 이동 가능<br>
*마우스 휠버튼 클릭으로 바로 Hand 툴 사용 가능

-Flythrough 모드: 씬 창에서 마우스 우클릭을 누르고 있으면 작동, WASD로 움직일 수 있음

-Orbit 모드: 씬 창에서 Alt+마우스 좌클릭으로 작동, 씬 중심에 있는 물체를 기준으로 마우스 공전 가능

####3) 오브젝트 편집

**-Translate(평행이동)**: Translate 툴로 오브젝트를 원하는 방향으로 이동 가능

<img width="735" alt="image" src="https://user-images.githubusercontent.com/68016394/147748404-17aa6527-65ab-4254-9d75-a8b80cac6b61.png">
위 그림에서 가운데 빨간색, 파란색, 초록색을 눌러 X축, Z축, Y축을 고정하고 이동시킬 수 있다.

**-Rotate(회전)**: Rotate 툴로 오브젝트를 회전시킬 수 있다.

<img width="736" alt="image" src="https://user-images.githubusercontent.com/68016394/147748885-cb603342-ca13-4af8-9eea-f49003a4bba6.png">
위 그림에서 가운데 빨간색, 파란색, 초록색을 눌러 X축, Z축, Y축을 기준으로 회전시킬 수 있다.

**-Scale(크기)**: Scale 툴로 오브젝트의 크기 배율을 설정할 수 있다. 

<img width="738" alt="image" src="https://user-images.githubusercontent.com/68016394/147748561-941fbc42-af9d-4af5-b04d-61aa0247f261.png">
위 그림에서 가운데 빨간색, 파란색, 초록색을 눌러 X축, Z축, Y축을 고정하고 방향으로 크기를 변형할 수 있다. 가운데 회색 큐브를 클릭하면 세 축을 동시에 변경할 수 있다.

**-Rect(직사각형)**: Rect 툴로 물체의 가로와 세로를 2D 직사각형으로 편집할 수 있다.

<img width="733" alt="image" src="https://user-images.githubusercontent.com/68016394/147748698-a6aef35c-4f7a-4176-96d7-27ee1e2fcec1.png">
Z축 방향을 무시하고 크기가 조정된다. UI나 2D오브젝트 편집에 주로 사용된다.

**-Transform(변형)**: Transform 툴로 Translate, Rotate, Scale을 동시에 편집할 수 있다.

<img width="735" alt="image" src="https://user-images.githubusercontent.com/68016394/147748835-0d985fb5-fe5a-4600-af7e-300bab6285ff.png">
사용방법은 동일하다.

---
###기즈모(Gizmo)
플레이어에겐 보이지 않고 개발자의 화면에서만 보이는 것들을 기즈모(Gizmo)라고 한다.

####씬 기즈모(Scene gizmo)
씬의 좌측 상단에 있는 것을 '씬 기즈모' 라고 한다.

<p align="center">
<img width="150" alt="image" src="https://user-images.githubusercontent.com/68016394/147749224-8d711514-8247-4bbd-a7ba-65e4ce853da5.png"/>
<br>
씬 기즈모(Scene gizmo)
</p>

각 색깔의 원뿔 암(arm)을 클릭하면 각 축의 시점으로 변환할 수 있다.
<br>

가운데 투명 큐브를 클릭하면 '투영 전환'을 할 수 있다. 원근(Perspective) 모드와 등각(Isometric) 모드로 전환할 수 있다.

<p align="center">
<img width="735" alt="image" src="https://user-images.githubusercontent.com/68016394/147749461-6976842b-8cb6-4f7c-ac3b-3533b6277f3a.png">
<br>
원근 모드
</p>

<p align="center">
<img width="736" alt="image" src="https://user-images.githubusercontent.com/68016394/147749400-6f36ca19-d1c7-4c21-bb80-be9928ac82ec.png">
<br>
등각 모드
</p>

---
###씬 플레이 버튼

<p align="center">
<img width="106" alt="image" src="https://user-images.githubusercontent.com/68016394/147749574-0f1b7f09-78e4-494f-a15b-04351c95d5bb.png">
<br>
씬 플레이 버튼
</p>

왼쪽부터

**1. Play**: 현재 씬을 플레이하거나 종료

**2. Pause**: 현제 플레이중인 씬을 일시정지

**3. Step**: 한 프레임만큼 씬 플레이


#*플레이 중 변경된 사항은 플레이 종료시 모두 삭제된다. 반드시 플레이를 종료한 후 편집하자...!*

