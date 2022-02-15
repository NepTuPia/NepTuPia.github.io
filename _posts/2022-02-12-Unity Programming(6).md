# 탄막 슈팅 게임 '닷지' - 플레이어 제작(2)

---
## 플레이어 제작

**플레이어 사망 처리**

이제 플레이어 사망 처리를 할 Die() 메서드를 만들어보자.

Die() 메서드는 자신의 게임 오브젝트를 비활정화하는 메서드이다. 이 메서드는 탄알과 플레이어가 충돌했을 때 실행될것이다. 

Die() 메서드는 PlayerController 스크립트가 스스로 실행하지 않는다. 플레이어에게 부딪힌 탄알이 Player Coltroller 스크립트에 접근하여 실행시킬것이며 그러므로 Die() 메서드는 public으로 접근제한자를 설정해 외부에서 접근 가능하도록 구현한다.

```
public void Die(){
    //자신의 게임 오브젝트 비활성화
    gameObject.SetActive(false);
}
```

gameObject는 MonoBehaviour 클래스에서 제공하는 게임 오브젝트 자기 자신을 가리키는 '변수'이다. 모든 컴포넌트는 gameObject 변수를 사용해 자신을 사용하고 있는 오브젝트(자신, 즉 컴포넌트의 게임 오브젝트)에 접근할 수 있다. PlayerColtroller 스크립트는 Player 오브젝트에 추가할 것이므로 gameObject 변수는 Player 오브젝트를 가리키게 되어 비활성화 처리를 할 수 있다.

GameObject와 gameObject를 혼동하면 안되는데, GameObject는 타입이고 gameObject는 변수이다. 즉,

`
GameObject gameObject;
`

인 것이다.

**SetActive() 메서드**

모든 게임 오브젝트는 스스로를 끄고 켜는 기능을 가지고 있다. 오브젝트의 Inspector 창에서 게임 오브젝트 이름 왼쪽에 보이는 체크 박스가 게임 오브젝트를 활성화/비활성화 하는 버튼이다.

SetActive() 메서드는 GameObject 타입, 즉 클래스에 내장되어 있는 메서드로서 해당 게임 오브젝트의 활성/비활성화를 담당한다.

<p align = "center">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/68016394/153695310-fdb06492-b4e3-4f06-8457-2b1bf89b70a9.png">
활성/비활성화 하는 체크 박스
</p>

위의 체크박스는 SetActive() 메서드를 활용해 원격으로 이용할 수 있다. 위의 Die() 메서드는 체크박스를 해제해 비활성화 상태로 만든 것이며 SetActive(True)를 통해 다시 활성화시킬 수 있다.


**PlayerController 컴포넌트 설정하기**

완성한 PlayerController 스크립트를 Player 게임 오브젝트에 컴포넌트로 추가하고 실행해보자. 

<p align = "center">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/68016394/153698454-7103f08f-3347-4a44-a2d5-6032e5f55acf.png">
스크립트 파일을 컴포넌트로 추가
</p>

위의 그림처럼 PlayerController 스크립트를 컴포넌트로 추가한 뒤 Player Rigid Body를 Player 오브젝트가 가지고 있던 리지드바디 컴포넌트로 할당해주자.

이 상태에서 씬을 플레이하면 상하좌우에 맞춰 캡슐형태의 플레이어가 움직이는 것을 확인할 수 있다.

## PlayerController 스크립트 개선하기

이렇게 완성한 PlayerController 스크립트는 몇가지 문제점이 있다.

1. 조작이 게임에 즉시 반영되지 않는다. <br> AddForce()로 힘을 주는 방식으로 움직임을 구현했기에 즉각적으로 움직이지 않고 가속도가 붙는 방식으로 움직이게 되어 조작감이 답답해진다. 
2. 입력 감지 코드가 복잡하다. <br> 4개의 if문을 활용한 방식을 좀 더 간결하게 개선해야 할 필요가 있다.
3. playerRigidbody에 컴포넌트를 드래그&드롭으로 할당하는 것이 불편하다. <br> 바로 앞에서 PlayerController 스크립트를 컴포넌트로 넣은 후 Player Rigid Body에 리지드바디 컴포넌트를 직접 손으로 할당했다. 이는 귀찮고 번거로우며 잘못된 컴포넌트를 할당할 위험도 있으므로 이를 코드로 처리할 필요가 있다.

위의 문제점들을 하나씩 개선시켜 나가보자!

**Start() 메서드 수정**

3번 문제 해결을 위해 Start() 메서드를 활용해 게임이 시작될 때 playerRigidBody에 리지드바디 컴포넌트의 참조를 할당하도록 수정하자.

```
private Rigidbody playerRigidBody; //이동에 사용할 리지드바디 컴포넌트

void Start()
{
    //게임 오브젝트에서 Rigidbody 컴포넌트를 찾아 playerRigidbody에 할당
    playerRigidBody = GetComponent<Rigidbody>();
}
```

우선 playerRigidBody 변수의 접근제한자를 private로 접근해 외부에서 변경할 수 없도록 설정했다. 즉 Start() 메서드를 통해서만 변경 가능하도록 해 잘못된 컴포넌트를 할당할 위험을 제거했다.

public이 아닌 변수는 Inspector창에서 확인할 수 없기때문에 이제 드래그&드롭 방식이나 드랍다운메뉴에서 선택하는 방식으로 컴포넌트를 할당할 수 없다.

***GetComponent() 메서드**

GetComponent() 메서드는 원하는 타입의 컴포넌트를 자신(스크립트)의 게임 오브젝트에서 찾아오는 메서드이다. 즉 자신(스크립트)를 컴포넌트로 가지고 있는 게임 오브젝트의 다른 컴포넌트를 찾아주는 메서드이다. 

GetComponent()가 해당하는 컴포넌트를 찾지 못하면 null값을 반환하며, <Rigidbody>는 제네릭을 사용해 GetConponent() 메서드가 다양한 타입의 컴포넌트에 작동할 수 있도록 한다.

**조작감 개선하기**

이제 1번째 문제였던 조작감 개선을 해보자. Update() 메서드를 수정해 이동속도 변화가 즉각 반영되도록 설정하자. 수정된 코드는 다음 기능들을 한다.

1. 수평축과 수직축의 입력값을 감지
2. 속도를 나타낼 새로운 Vector3 생성
3. 리지드바디 컴포넌트의 속도 설정

```
void Update()
{
    //수평축과 수직축의 입력값을 감지하여 저장
    float xInput = Input.GetAxis("Horizontal");
    float zInput = Input.GetAxis("Vertical");
    
    //실제 이동 속도를 입력과 이동 속력을 사용해 결정
    float xSpeed = xInput * speed;
    float zSpeed = zInput * speed;

    //Vector3 속도를 (xSpeed, 0, zSpeed)로 설정
    Vector3 newVelocity = new Vector3(xSpeed, 0f, zSpeed);

    //리지드바디의 속도에 newVelocity 할당
    playerRigidbody.velocity = newVelocity;
}
```

Input.GetAxis() 메서드는 어떤 축에 대한 입력값을 숫자로 반환하는 메서드이다.

`
Input.GetAxis(String axisName);
`

코드에 쓰인 "Horizontal" 축과 "Vertical" 축에 매핑(Mapping)된 키의 입력이 감지되면 해당 입력이 축에 대해 양의 방향이면 1.0, 음의 방향이면 -1.0, 없으면 0.0을 반환하게 된다.

이렇게 반환된 값에 speed = 8.0f를 곱해 현재의 속도를 구하고 이를 velocity3 타입의 값으로 설정해 플레이어 오브젝트의 현재 속도를 즉각적으로 변경한다.

즉, Addforce() 메서드는 관성을 이용하는 메서드이다, 계속해서 힘을 가해 속도를 서서히 증가시키는 연속함수의 특징을 지닌다면 velocity 값을 변경하는 것은 이전 속도를 지우고 새로운 속도를 설정하는 구간함수의 특성을 지니는 것이다. 

이제 씬을 저장하고 게임을 플레이해보면 훨씬 개선된 조작감으로 플레이어 오브젝트를 조종할 수 있게 된다.

## 입력 매니저

Input.GetAxis() 메서드로 Input.GetKey() 메서드를 대체했었다. 이는 다음과 같은 의의가 있다.

1. 입력기 커스터마이제이션을 구현(흔히 말하는 컨트롤러 키 매핑-Mapping)
2. 조이스틱같은 다양한 입력장치에 대응하기 위해

**입력기 커스터마이제이션**

처음에는 플레이어 컨트롤을 위해 update() 메서드에 다음과 같은 코드를 사용했다.

```
if (Input.GetKey(KeyCode.UpArrow == True){
	playerRigidbody.AddForce(0f, 0f, speed);
}
```

하지만 이런 방식은 조작 키를 실시간으로 변경할 수 없다는 단점이 있다. 위의 예시는 방향키 위쪽인데 이를 w키로 바꿀려면 아래와 같이 변경해야 한다. 

```
if (Input.GetKey(KeyCode.W == True){
	playerRigidbody.AddForce(0f, 0f, speed);
}
```

조작키를 변경할 때 마다 코드를 수정해서 새로 빌드할 수 없으므로 우리는 다양한 키 커스터마이제이션을 위해 다른 방법을 강구해야 한다.

즉, 

```
if ('특정 키'를 입력){
	수행;
}
```

의 방식을

```
if (수행에 '해당하는 키'를 입력){
	수행;
}
```

의 방식으로 바꿔야 한다. 이를 위해 위에서 사용한 '축'이 바로 이 방법이다. GetAxis()메서드에서 사용한 Horizontal과 Vertical도 이 '축'의 한 종류로 대응되는 버튼을 지닌다. 대응되는 버튼은 유니티의 입력매니저에서 설정할 수 있으므로 Horizontal 축을 변경할 대응 버튼을 위 아래 화살표에서 W, D로 입력매니저에서 변경만 해주면 코드 변경없이 사용할 수 있는 것이다. 

유니티 프로그램 상단 메뉴에서 Edit > Project Settings... > Input > Axes 리스트를 펼치면 입력축들에 대응되는 버튼들을 커스텀할 수 있다!

<p align = "center">
<img width="953" alt="image" src="https://user-images.githubusercontent.com/68016394/154027974-1918ae15-b768-488f-b9ff-6ce87bc4c5a5.png">
여러 축에 대응되는 버튼 편집
</p>

**멀티플랫폼 입력 지원**

위의 버튼 편집창에서 보면 'Horizontal'과 'Vertical'이 하단에 하나 더 있는 것을 확인할 수 있다. 아래는 XBOX 컨트롤러같은 게임패드와 연동되는 부분인데 이처럼 여러 플랫폼의 입력을 지원할 수 있다.

그리고 여기에서 KeyCode.UpArrow처럼 true/false가 아닌 특정한 '값'으로 코드를 작성하는지에 대해 이유를 파악할 수 있다.

키보드와 달리 컨트롤러는 조이스틱을 미는 정도를 조절할 수 있다. 끝까지 쭉 밀면 빠르게 이동하고 조금만 밀면 느리게 이동하는 캐릭터를 조종해본 경험이 있을 것이다. 이를 지원하기 위해 이같이 설정할 수 있도록 만든 것이다.

## 요약

1. 머티리얼(Mertirial)은 게임 오브젝트 표면의 색을 결정한다.
2. Main Camera 컴포넌트의 Clear Flags를 변경하여 게임 배경을 변경할 수 있다.
3. Update() 메서드는 매 프레임(게임 화면의 갱신 시)마다 실행된다.
4. gameObjec.~~~ 로 자신의 게임 오브젝트에 접근할 수 있는 변수로 MonoBehaviour에서 상속받은 변수이다.
5. GetComponent() 메서드는 게임 오브젝트로부터 원하는 타입의 컴포넌트를 찾아서 이용할 수 있게 해준다.
6. Vettor3 타입의 변수는 x, y, z값을 가지는 타입으로 위치, 스케일, 속도 등을 나타낼 수 있다.
7. 리지드바디 컴포넌트에서 Constraints 필드에서 특정 축의 위치나 회전이 변경되지 않도록 고정할 수 있다.
8. 리지드바디 컴포넌트는 현재 속도를 표현하는 변수인 velocity를 제공한다.
9. Input.GetKey() 메서드로 특정 키의 입력을 감지해 true/false로 반환한다.
10. Input.GetAxis() 메서드로 입력축에 대응되는 버튼의 입력을 감지할 수 있다.
11. Input.GetAxis() 메서드는 버튼 입력을 -1.0 ~ 1.0의 값으로 반환한다.
12. 입력축(Axis)을 통해 코드 수정 없이 사용 버튼을 변경하고 멀티 플랫폼에 대응할 수 있다.
13. 입력매니저에서 입력축을 관리한다.