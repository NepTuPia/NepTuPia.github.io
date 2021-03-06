# 탄막 슈팅 게임 '닷지' - 플레이어 제작

---

## 레벨  및 카메라 설정

**1. 바닥 제작**

Hierarchy > Create > 3D object > Plane으로 기본이 될 바닥을 만들자
Inspector창에서 Transform 컴포넌트의 Position에서 평면의 위치를 조정할 수 있다. 기본 원점인 (0, 0, 0)으로 셋팅해두자.

<p align = "center">
<img width="900" alt="image" src="https://user-images.githubusercontent.com/68016394/153201009-628af2b9-cb66-498b-9ff4-5971b3eb274f.png">
평면 생성 및 원점에 셋팅
</p>

**2. 가로와 세로길이를 두 배 늘리기**

Inspector 창의 Transform 컴포넌트의 스케일을 (2, 1, 2)로 변경

<p align = "center">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/68016394/153201165-b22e0e1b-6264-48a5-85a5-06e3d8641f5a.png">
Transform 컴포넌트와 셋팅값 조절
</p>

Unity에서 Plane의 가로 세로는 1당 10unit이다. 또한 1 Unit은 Cube 한번의 길이와 동일하다. 즉 1 길이의 Plane엔 10개의 Cube를 나열할 수 있다. 

그리고 1unit을 현실의 몇 m와 대응시킬지는 개발자 마음이나 보통 1unit = 1m로 셋팅한다.


**3. 머티리얼(Material)**

Unity에서 게임 오브젝트의 컬러는 머티리얼이 결정한다. 머티리얼은 셰이더 + 텍스처가 합쳐진 asset으로 오브젝트 픽셀의 컬러를 결정한다.

Assets > Create > Material로 머티리얼 에셋을 만들자. 

이렇게 생선한 머티리얼의 Inspector창을 보자

'Albedo'는 반사율을 결정한다. 색상은 빛을 반사해서 우리눈에 들어오므로 Albedo가 결국 해당 게임 오브젝트의 색상을 결정하는 요소이다.

생성한 머티리얼의 Albedo를 검정색으로 적용한 후  적용할 게임 오브젝트에 Drag & Drop으로 넣어 적용시켜보자. 

<p align = "center">
<img width="1166" alt="image" src="https://user-images.githubusercontent.com/68016394/153202436-30dec31f-7ea3-4f45-bfc6-1fa1cc1e5e74.png">
머티리얼 제작 및 Plane에 적용
</p>

**4. 벽 제작**

이제 바닥 위에 벽을 만들어보자.

Hierarchy > Create(+) > 3D object > Cube로 큐브를 생성하면 Scale이 (1, 1, 1)의 큐브가 생성된다. Scale을 (10, 1, 1)로 설정해 쭉 늘어진 기둥을 만든 뒤 Position 값을 조절해 바닥의 양 모서리에 위치시키자. 한번 만든 Cube 오브젝트는 복사 - 붙여넣기로 간편하게 복제할 수 있다 .

<p align = "center">
<img width="1167" alt="image" src="https://user-images.githubusercontent.com/68016394/153203608-a3a26a51-fe8e-4d34-8280-2effa087c262.png">
벽 제작
</p>

**5. 레벨로 오브젝트 관리**

이렇게 만들고나니 Hierarchy 창이 좀 복잡하다. 보기 간편하게 정리해보자. 

Hierarchy > Create > Empty Object로 빈 오브젝트를 만든 뒤 만들었던 Plane과 Wall들을 생성한 빈 오브젝트에 Drag & Drop으로 자식으로 만들어주자. 

<p align = "center">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/68016394/153204100-577cb5cf-226a-4aaa-99cf-ad359d659c59.png">
깔끔해진 Hierarchy 창
</p>

**6. 카메라 설정**

이제 플레이시에 보일 화면을 설정해보자.

Hierarchy창에 있는 Main Camera 오브젝트를 눌러 Inspector창을 설정하자. 

Position값을 (0, 15, -10), Rotation값을 (60, 0, 0)으로 설정하면 한눈에 화면이 눈에 들어오게 카메라 뷰를 세팅할 수 있다. 

배경색도 어색하므로 Inspector > Camera > Clear Flags의 값을 Solid Color로 바꿔 단색으로 설정해주자. 

이렇게 기본적인 게임의 틀인 씬의 레벨과 카메라 설정을 완료했다.

## 플레이어 제작

이제 스크립트를 이용해 조작할 수 있는 게임 오브젝트인 플레이어를 만들어보자. 

이 게임에서 플레이어는 다음과 같은 동작을 한다.

1. 파란색 캡슐 모양이다.
2. 상하좌우 혹은 WASD키로 움직인다.
3. 탄알에 맞으면 죽는다.

---

**플레이어 게임 오브젝트 만들기**

Hierarchy > Create > 3D Object > Capsule로 캡슐형태의 오브젝트를 만들고 이름을 "Player"로 설정하자. 머티리얼을 통해 파란색으로 플레이어 오브젝트 색깔을 설정해주자. 

<p align = "center">
<img width="1673" alt="image" src="https://user-images.githubusercontent.com/68016394/153624920-200afa88-d0ee-4cb8-b008-78628b56db7f.png">
플레이어 오브젝트 생성
</p>

**태그 설정**

나중에 탄알을 만들 때 탄알 입장에서 충돌한 게임 오브젝트가 플레이어인지 아닌지 확인하기 위해 "태그(Tag)"를 사용한다.

태그는 게임 오브젝트를 분류하고, 코드상으로 오브젝트끼리 구별할 때 사용한다.

생성한 "Player"오브젝트의 Inspector창 > Tag 드롭다운메뉴 > Player 선택

<p align = "center">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/68016394/153625697-62948f51-cf5e-49f1-a43d-58c19d8c1cf2.png">
플레이어 오브젝트의 태그를 "Player"로 설정
</p>

이렇게 설정하면 나중에 총알 오브젝트가 다른 오브젝트와 충돌할 때 "Player"의 태그인 오브젝트를 구별할 수 있어 게임오버를 판별할 수 있다.

**리지드바디 컴포넌트 설정**

이제 플레이어가 움직이거나 총알과 부딪히는 등 물리적인 법칙에 지배받게 하기 위해 리지드바디 컴포넌트를 플레이어 오브젝트에 추가해보자.

플레이어 오브젝트의 Inspector창 > Add Component > Physics > Rigidbody로 리지드바디 컴포넌트를 플레이어 게임 오브젝트에 추가해보자

이상태 그대로 두면 플레이어는 캡슐모양이기에 이리저리 굴러다니게 된다.
리지드바디의 제약(Constraints)옵션을 사용해 어떤 축의 위치나 회전이 변경되지 않게 설정할 수 있다.

플레이어 오브젝트의 Inspector창 > Rigidbody 컴포넌트 창 > Constraints > Freeze Position의 Y 체크, Freeze Rotation의 X, Z 체크

<p align = "center">
<img width="1342" alt="image" src="https://user-images.githubusercontent.com/68016394/153692792-f10f664d-7696-4b62-b2a0-1230ba2c2e57.png">
리지드바디 컴포넌트 추가 및 제약 설정
</p>

**플레이어 스크립트 생성**

이제 플레이어를 조종하기 위한 스크립트 파일을 만들어야 한다. 플레이어 스크립트는 다음과 같은 기능을 가진다.

1. 사용자의 키보드 입력 감지
2. 리지드 바디를 사용하여 Player 게임 오브젝트 움직이기

PlayerColtroller 스크립트 파일을 만들어 위의 기능을 구현해보자.

게임오브젝트의 이동을 구현할 때 물리적인 힘들 가하는 방식을 사용할 것이다. 따라서 PlayerController 스크립트에 Player 게임 오브젝트에 추가된 리지드바디 컴포넌트를 변수로 가져와 사용해야 한다. 리지드바디 컴포넌트를 할당할 변수와 이동 속력을 지정할 변수를 선언해보자. 


```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{   
    public Rigidbody playerRigidBody; //이동에 사용할 리지드바디 컴포넌트
    public float speed = 8f; //이동 속력 

    void Start()
    {
        
    }


    void Update()
    {
        
    }
}
```

나중에 이 playerRigidbody 변수를 통해 Rigidbody 컴포넌트를 지닌 오브젝트를 가리켜서 조종할 수 있다. 즉 playerRigidbody 변수에 Player 오브젝트의 리지드바디 컴포넌트를 지정해 사용할 것이다.

**사용자 입력 감지**

이제 입력을 감지하는 기능을 만들자. 입력을 감지하려면 Update() 메서드와 Input 클래스의 입력 감지 메서드를 활용할 것이다. 

1. Update() 메서드 <br> 게임속의 모든 정보는 실시간으로 변한다. 인공지능 적이 플레이어를 추적하는 등의 작업에서 이렇게 실시간으로 변한느 정보를 계속해서 모니터링 하는 작업이 필요하다. 대부분 게임은 주기적으로 이러한 갱신 처리를 진행하며 보통 화면이 새로 그려지는 주기인 프레임(Frame)에 맞춰 실행된다. <br> Update() 메서드는 Start() 메서드처럼 특정 시점에 자동으로 실행되는 유니티 이벤트 메서드이며 매 프레임마다 실행되는 메서드이다. 만약 60FPS라면 1초마다 60번 update() 메서드가 실행되는 것이다.   

2. Input 클래스 <br> 유니티 Input 클래스는 사용자의 입력을 감지하는 메서드를 모아둔 집합이다. Input의 입력감지 메서드는 실행 시점에 어떤 키를 눌렀는지 알려준다. <br> Update() 메서드는 1초에 수십 번씩 실행되므로 Update()메서드에 입력 감지 메서드를 사용하면 매우 짧은 간격으로 입력을 받을 수 있고 게임 유저는 실시간으로 입력을 받아들인다고 인식할 수 있다. 

update()메서드를 다음과 같이 바꾸자

```
void Update()
{
    if (Input.GetKey(KeyCode.UpArror) == ture){
        //위쪽 방향키 입력이 감지된 경우 z 방향 힘 주기
        playerRigidBody.AddForce(0f, 0f, speed);
    }
    if (Input.GetKey(KeyCode.DownArror) == ture){
        //아래쪽 방향키 입력이 감지된 경우 -z 방향 힘 주기
        playerRigidBody.AddForce(0f, 0f, -speed);
    }
    if (Input.GetKey(KeyCode.RightArror) == ture){
        //오른쪽 방향키 입력이 감지된 경우 x방향 힘 주기
        playerRigidBody.AddForce(Speed, 0f, 0f);
    }
    if (Input.GetKey(KeyCode.LeftArror) == ture){
        //왼쪽 방향키 입력이 감지된 경우 -x방향 힘 주기
        playerRigidBody.AddForce(-speed, 0f, 0f);
    }
}
```
위의 코드는 상하좌우 방향키의 입력을 감지하고 게임 오브젝트에 힘을 가해 해당 방향으로 이동시킨다.

Input.GetKey() 메서드는 키보드의 식별자를 KeyCode 타입의 변수로 입력받는다.

`
bool Input.GetKey(KeyCode key);
`

위의 메서드가 실행될 때 해당 키를 누르고 있으면 True, 아니면 False를 반환한다. 
4종류의 키를 감지하는 4개의 Input.GetKey() 메서드가 1초에 수십번씩 실행되고 있으므로 실시간으로 입력을 감지할 수 있는 것이다.

이 외에도

```
Input.GetKeyDown() // 해당 키를 누르는 '순간' true, 나머지는 false
Input.GetKeyUp() // 해당 키를 누르다가 손을 떼는 '순간' true, 나머지는 false
```

의 메서드들도 있다. 위의 2개의 메서드들은 Input.GetKey() 메서드와 달리 '누르고 있는 동안'은 false를 반환한다.

***

### 내용이 길어지므로 다음 글에서 Player 게임 오브젝트의 설정을 마무리하겠다.
