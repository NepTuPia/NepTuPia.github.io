# 2D 러너 게임 '유니런' 제작 - 플레이어 제작(2)

캐릭터 오브젝트가 준비되었으므로 캐릭터의 애니메이션을 만들어보자. 

# 캐릭터 애니메이션 준비

애니만든 애니메이션을 저장할 'Animations' 폴더를 만드고 애니메이션을 만들어보자. 아까 만들어둔 스프라이트들을 활용해 점프, 달리기, 사망 애니메이션을 만들 것이다. 

유니티 상단 메뉴에서 Window > Animation > Animation을 눌러 애니메이션 창을 열자. 

![image](https://user-images.githubusercontent.com/68016394/160514476-9ce78e1b-c7b8-4361-8eda-b39af2101bf3.png)
 
 애니메이션창에 아무것도 뜨지 않을텐데, 애니메이션을 만들 오브젝트를 하이어라키 창에서 선택하고 다시 애니메이션창을 보면 Create를 할 수 있다. 캐릭터 오브젝트의 애니메이션을 만들 것이므로 Player 오브젝트를 클릭하고 애니메이션을 만들자.
 
 Jump.anim으로 확장자를 'anim'으로 주어 애니메이션 파일을 만들고, 아까 잘라둔 tokojump 스프라이트 파일들을 드래그&드랍으로 애니메이션 타임라인에 넣어주자. 그리고 샘플레이트를 13으로 조정해주어 적절한 속도로 애니메이션이 재생되게 해주자. 샘플레이트가 보이지 않는다면 애니메이션 창의 타임라인 창 우측 상단에 있는 가로 점 3개를 눌러 'Show sample Rate'를 누르면 샘플 레이트를 설정할 수 있다. 
 
 ![image](https://user-images.githubusercontent.com/68016394/160514922-89b17fc7-dd32-4556-a3b7-1bad0be18740.png)
 
 같은 방법으로 다른 모션들도 애니메이션을 만들어주자. 다만 Die 애니메이션의 경우 하나 더 설정을 만져줘야 한다. 다른 애니메이션은 계속해서 반복되는 애니메이션이지만 사망시에는 딱 한번만 애니메이션이 실행되어야 한다. 그러므로 Die 애니메이션 클립파일을 클릭해 Inspector창에서 'Loop Time' 박스를 체크 해제해서 한번만 애니메이션이 실행되도록 만들자. 
 
 **1. 유한 상태 머신(Finite State Machine, FSM)**
 
애니메이션 클립을 제작했다면, 클립들을 재생하고 관리할 '애니메이터 컨트롤러'가 필요하다. 그리고 유니티에서 애니메이션 컨트롤러는 '유한 상태 머신'이라는 패러다임으로 작동하도록 설계되었다. 
 
 유한 상태 머신 내에는 유한개의 상태가 존재함과 동시에 하나이 상태만 '현재 상태'가 되도록 작동한다. 그리고 다른 상태로의 변화는 '전이(Transition)'을 통해 상태가 변화하도록 한다. 
 
 예를들어 게임내에서 적 NPC의 AI를 생각해보자. '탐색' 상태의 적 AI는 '시야 내에서 적을 발견'이라는 조건이 충족되기 전까지는 '탐색' 상태를 계속해서 유지한다. 그러다가 시야 내에 플레이어 캐릭터가 발견되면 조건을 충족하게되어 '추격' 상태로 상태가 '전이'하게 된다. 그러다가 '공격 범위 내에서 적이 발견' 이라는 조건을 충족하게되면 '공격'이라는 상태로 전이하게된다. 그리고 다시 '범위 내에 적이 없음'이라는 조건을 충족하면 다시 '탐색' 상태로 전이하게 된다. 
 
 이렇듯 유한 상태 머신을 사용하면 여러 상태와 조건을 명확하고 깔끔하게 설명하고 설계할 수 있다!
 
 **2. 애니메이터 컨트롤러와 애니메이터**
 
 '애니메이터 컨트롤러(Animator Controller)'은 유한 상태 머신을 사용해 사용할 애니메이션을 결정하는 전체 '상태도'를 표현하는 에셋이다. 그리고 이런 상태도를 참고해 실제 게임 오브젝트에 애니메이션 작동을 담당하는 것이 애니메이터이며 컴포넌트로서 오브젝트 안에 들어가 작동한다. 
 
 새로운 애니메이터 컨트롤러는 상단 메뉴에서 Assets > Animator Controller로 생성할 수 있다. 하지만 아까 애니메이션 클립을 만들면서 'Player'라는 에셋이 생성된 것을 봤을 것이다. 기본적으로 애니메이터 컨트롤러는 오브젝트의 애니메이션을 제작하면 자동으로 생성된다. 
 
 ![image](https://user-images.githubusercontent.com/68016394/160519694-b772aa7a-c07f-485f-b0d8-cb9ee98bd49a.png)
 <p align = 'center'>
 Player라는 이름의 에셋이 애니메이터 컨트롤러다.
 
 Player 애니메이터 컨트롤러를 클릭하면 상태도를 볼 수 있다. 
 
 ![image](https://user-images.githubusercontent.com/68016394/160519888-3c020832-2a72-4ca3-9639-20406188947c.png)
 
 네모난 박스는 상태들을 나타내고 화살표는 전이를 표현한다. 아까 만들어둔 Run, Jump, Die 애니메이션이 상태로 들어가 있고 그 외에 Entry, Exit, Any State 3가지의 상태가 더 있는것을 볼 수 있다. 
 
 **1. Entry**
 
 Entry와 연결된 상태는 해당 오브젝트의 '기본 상태(Default State)'가 된다. 캐릭터의 기본 상태는 달리고 있는 상태이므로 Run 애니메이션과 연결해주어 게임이 시작되면 캐릭터가 Run 애니메이션을 바로 실행하도록 설정해준다.
 
 **2. Exit**
 
 Exit은 말 그대로 애니메이터의 종료를 의미한다. 다른 상태에서 Exit 상태로 전이되면 오브젝트의 애니메이터 컴포넌트가 작동을 종료하고 더이상 아무런 애니메이션도 실행하지 않는다. 
 
 **3. Any State**
 
 Any State는 다른 상태에 있다가도 특정 조건을 만족하면 Any State에 연결된 상태로 바로 전이되게 만든다. Run이나 Jump 중이더라도 Any State와 연결된 Die, 즉 사망에 해당하는 조건을 만족하게 되면 바로 Die 애니메이션을 실행하고 이와 연결된 Exit 상태로 전이되어 애니메이터를 종료하게 된다. 
 
위의 내용을 참고해 이제 위의 그림처럼 상태도를 구성해보자.

# 애니메이터 전이 구성하기

**!. 전이 화살표 배치**

상태 박스를 우클릭해 'Make Transition'을 누르면 화살표를 연결해 전이를 표현할 수 있다. 시작할 기본 애니메이션 상태는 Run이므로 Entry와 Run을 연결하자.

Run과 Jump는 서로 계속 오고가므로 서로를 향하도록 전이를 구성하자.

달리거나 뛰는중에도 사망하게되면 바로 사망 모션을 재생해야 하므로 Any State와 Die 상태를 연결하고, 사망하게되면 더이상 아무런 애니메이션을 재생하지 않아야 하므로 Die 상태와 Exit를 연결해 애니메이터 컴포넌트가 종료될 수 있도록 하자. 

**2. 전이 조건(파라미터) 추가**

이제 각 전이들이 언제 발생할지 파라미터들을 추가해보자. 애니메이터 창에서 'Parameters'라는 메뉴 탭을 발견할 수 있다. '+' 버튼을 눌러 'Bool' 타입의 'Grounded' 파라미터를 추가하고, 'Trigger' 타입의 'Die' 파라미터를 추가하자. 

파라미터로 가능한 타입들은 실수(float), 정수(int), 불리언(Bool), 트리거(Trigger) 타입으로 4가지가 존재한다. Run과 Jump 상태를 오고가기 위한 조건인 'Grounded'는 Bool 타입을 통해 땅에 닿아있으면 true, 떠있으면 false를 가지도록 설정해 상태의 전이가 일어나도록 할 것이다. 그리고 trigger 타입을 통해 조건을 만족하는 순간 바로 Die로의 전이가 일어날 수 있도록 설정할 것이다. 

이제 추가한 조건을들 전이 화살표에 넣어주자.

Run과 Jump 사이에 있는 전이 화살표를 클릭하면 Inspector창을 볼 수 있다. 우선 'Has Exit Time'을 체크 해제해주자. 이 옵션을 해제해주어야 애니메이션이 바로 전환된다. 그리고 'Transition Duration'도 0으로 주고, 아래의 'Conditions'에서 '+'를 눌러 아까 만들어둔 'Grounded' 파라미터를 조건으로 주어 해당 조건에 따라 전이가 일어나도록 설정하자!

![image](https://user-images.githubusercontent.com/68016394/160522270-3ed189d2-b3db-4ac2-8914-a4643e122c90.png)

마찬가지로 Jump -> Run 전이와 Any State -> Die 전이도 위처럼 설정해주자. 

이렇게 애니메이션 클립과 애니메이터 컨트롤러, 그리고 애니메이터 사이의 설정이 끝났다.

# PlayerController 스크립트

이제 Player 오브젝트를 조종할 PlayerController 스크립트를 만들어 기본적인 조작과 위에 만들어둔 애니메이션들이 작동하도록 만들어보자. 

C# 스크립트를 만들고 'Scripts' 폴더에 저장하고 다음과 같이 코드를 입력하자.

```
using UnityEngine;

// PlayerController는 플레이어 캐릭터로서 Player 게임 오브젝트를 제어한다.
public class PlayerController : MonoBehaviour {
   public AudioClip deathClip; // 사망시 재생할 오디오 클립
   public float jumpForce = 700f; // 점프 힘

   private int jumpCount = 0; // 누적 점프 횟수
   private bool isGrounded = false; // 바닥에 닿았는지 나타냄
   private bool isDead = false; // 사망 상태

   private Rigidbody2D playerRigidbody; // 사용할 리지드바디 컴포넌트
   private Animator animator; // 사용할 애니메이터 컴포넌트
   private AudioSource playerAudio; // 사용할 오디오 소스 컴포넌트

   private void Start() {
       // 게임 오브젝트로부터 사용할 컴포넌트들을 가져와 변수에 할당
        playerRigidbody = GetComponent<Rigidbody2D>();
        animator = GetComponent<Animator>();
        playerAudio = GetComponent<AudioSource>();
   }

   private void Update() {
       if (isDead){
           // 플레이어 사망시 return함으로써 바로 종료
           return;
       }

       if (Input.GetMouseButtonDown(0) && jumpCount < 2){
           //점프 횟수 증가
           jumpCount++;
           // 점프 직전에 속도를 순간적으로 제로(0, 0)으로 변경
           playerRigidbody.velocity = Vector2.zero;
           // 리지드바디에 위쪽으로 힘 주기
           playerRigidbody.AddForce(new Vector2(0, jumpForce));
           // 점프 사운드 실행
           playerAudio.Play();
        }
        else if (Input.GetMouseButtonUp(0) && playerRigidbody.velocity.y > 0){
            // 마우스 버튼에서 손을 떼는 순간 && 속도의 y 값이 양수라면(위로 상승중 이라면)
            // 현재 속도를 절반으로 변경
            playerRigidbody.velocity = playerRigidbody.velocity * 0.5f;
        }
        // 애니메이터의 Grounded 파라미터를 isGround 값으로 갱신
        animator.SetBool("Grounded", isGrounded);
   }

   private void Die() {
       // 사망 처리
       animator.SetTrigger("Die");

       playerAudio.clip = deathClip;

       playerAudio.Play();

       playerRigidbody.velocity = Vector2.zero;

       isDead = true;
   }

   private void OnTriggerEnter2D(Collider2D other) {
       // 트리거 콜라이더를 가진 장애물과의 충돌을 감지
       if(other.tag == "Dead" && !isDead){
           Die();
       }
   }

   private void OnCollisionEnter2D(Collision2D collision) {
       // 바닥에 닿았음을 감지하는 처리
       if(collision.contacts[0].normal.y > 0.7f){
           isGrounded = true;
           jumpCount = 0;
       }
   }

   private void OnCollisionExit2D(Collision2D collision) {
       // 바닥에서 벗어났음을 감지하는 처리
       isGrounded = false;
   }
}
```

이제 하나씩 살펴보자. 

**1. 변수부**

```
public AudioClip deathClip; // 사망시 재생할 오디오 클립
public float jumpForce = 700f; // 점프 힘

private int jumpCount = 0; // 누적 점프 횟수
private bool isGrounded = false; // 바닥에 닿았는지 나타냄
private bool isDead = false; // 사망 상태

private Rigidbody2D playerRigidbody; // 사용할 리지드바디 컴포넌트
private Animator animator; // 사용할 애니메이터 컴포넌트
private AudioSource playerAudio; // 사용할 오디오 소스 컴포넌트
```

deathClip은 사망시 재생할 오디오클립을 담아두는 AudioClip 타입의 변수다. 에셋을 타입으로 하는 변수이므로 Player 객체의 Inspector 창에서 제공받은 폴더에 존재하는 사망시 오디오 클립을 할당해주면 된다. 

jumpForce는 700f만큼의 힘을 점프시에 캐릭터에게 주기위한 변수이며 jumpCount는 2단점프나 3단점프를 구현하기 위해 현재 점프를 몇번 했는제 세는 변수이다. 점프할때마다 1씩 증가하며 땅에 닿으면 다시 초기화된다.

bool 타입의 isGrounded와 isDead는 애니메이터 동작을 위한 변수이다.

Rigidbody2D, Animator, AudioSource 같은 컴포넌트 타입의 변수들은 GetComponent() 메서드를 통해 오브젝트의 컴포넌트에 접근해 스크립트로 조종하기 위한 변수다.

변수를 살펴봤으니 이제 메서드들을 살펴보자. 

**2. Start() 메서드**

```
private void Start() {
   // 게임 오브젝트로부터 사용할 컴포넌트들을 가져와 변수에 할당
    playerRigidbody = GetComponent<Rigidbody2D>();
    animator = GetComponent<Animator>();
    playerAudio = GetComponent<AudioSource>();
}
```

게임이 시작되자마자 캐릭터가 해야 할 행동은 없다. 아까 선언한 컴포넌트 타입의 변수들에 GetComponent() 메서드를 활용해 Player 오브젝트의 컴포넌트들을 변수에 할당해주자.


**3. Update() 메서드**

```
private void Update() {
   if (isDead){
       // 플레이어 사망시 return함으로써 바로 종료
       return;
   }

   if (Input.GetMouseButtonDown(0) && jumpCount < 2){
       //점프 횟수 증가
       jumpCount++;
       // 점프 직전에 속도를 순간적으로 제로(0, 0)으로 변경
       playerRigidbody.velocity = Vector2.zero;
       // 리지드바디에 위쪽으로 힘 주기
       playerRigidbody.AddForce(new Vector2(0, jumpForce));
       // 점프 사운드 실행
       playerAudio.Play();
    }
    else if (Input.GetMouseButtonUp(0) && playerRigidbody.velocity.y > 0){
        // 마우스 버튼에서 손을 떼는 순간 && 속도의 y 값이 양수라면(위로 상승중 이라면)
        // 현재 속도를 절반으로 변경
        playerRigidbody.velocity = playerRigidbody.velocity * 0.5f;
    }
    // 애니메이터의 Grounded 파라미터를 isGround 값으로 갱신
    animator.SetBool("Grounded", isGrounded);
}
```

매 프레임마다 실행되는 Update() 메서드이다.

우선 'isDead' 변수를 체크해 true라면 캐릭터가 사망한 것이므로 return문을 통해 현재 실행된 Update() 메서드를 종료해 뒤의 코드들이 실행되지 않도록 처리해 사망을 구현한다.

그 다음 if문을 보자. 조건을 보면 '마우스 버튼이 눌렸을 때'와 'JumpCount가 2 미만일 때' 2개의 조건이 달려있다. 즉 플레이어가 점프버튼을 눌렀고, 아직 캐릭터가 점프할 수 있다면(땅에 있거나 1번밖에 점프하지 않았다면) 점프를 실행하는 것이다. 

jumpCount 변수를 1 증가해 무한정 점프할 수 없도록 막고 playerRigidbody 변수를 통해 캐릭터 오브젝트의 리지드바디 컴포넌트에 접근해 적절히 힘을 주어 점프하도록 한다. 마지막으로 점프시 사운드를 출력하도록 처리한다.

그 다음 else if문을 보자. 조건을 보면 '마우스 버튼이 떼졌을 때'와 '캐릭터의 y축 속도가 양수라면' 2개의 조건이 달려있다. 즉 플레이어가 점프키를 누르지 않았고, 캐릭터가 위로 상승(y축으로 양수의 속도로 이동중)이라면 캐릭터의 속도를 0.5배로 갱신시켜 감속이 일어나도록 한다. 이렇게 하면 마우스를 오래 누르고 있을수록 캐릭터가 높이 점프하는 기능을 구현할 수 있다!

마우스 버튼을 눌러 점프를하면 700f의 힘이 캐릭터에게 가해진다. 하지만 바로 마우스버튼을 놓아 else if문이 실행되면 최고 높이에 도달하기 전에 속도가 절반으로 줄어버려 최종적으로 점프의 높이 낮아지게 되는 것이다.

주의할 점은 단순히 마우스 버튼을 땠을 때 속도를 0.5배 하게 되면 낙하중일 때 낙하속도가 줄어들어 천천히 떨어지게 된다. 그러므로 'y축 이동속도가 양수'라는 조건을 통해 상승중일때만 해당 조건문이 작동하도록 구현한 것이다.

위의 조건문을 실행하고 난후 마지막으로 SetBool() 메서드를 통해 애니메이터의 파라미터 값을 변경해준다. isGrounded 변수는 현재 캐릭터가 땅에 닿아있는지 아닌지를 나타내므로 아까 애니메이터에 추가해준 파라미터인 'Grounded' 파라미터를 isGronded 변수의 값으로 셋팅해 적절한 애니메이션이 실행되도록 한다.

***마우스 클릭 인식**

유니티에서 마우스입력은 위의 코드처럼 'Input.GetMouseButton' 류의 메서드로 입력받는다. 키보드 입력처럼 3가지 종류가 있다.

1. Input.GetMouseButtonDown() : 마우스 버튼을 '누르는 순간'
2. Input.GetMouseButton() : 마우스 버튼을 '누르는 동안'
3. Input.GetMouseButtonUp() : 마우스 버튼을 '떼는 순간'

그리고 메서드의 인자로 0, 1, 2 세가지 Int 타입의 값을 받는다.

1. 0 : 마우스 좌클릭
2. 1 : 마우스 우클릭
3. 2 : 마우스 휠클릭

**4. Die() 메서드**

```
private void Die() {
   // 사망 처리
   animator.SetTrigger("Die");

   playerAudio.clip = deathClip;

   playerAudio.Play();

   playerRigidbody.velocity = Vector2.zero;

   isDead = true;
}
```

Die() 메서드가 실행되면 캐릭터가 사망한 것이므로 우선 애니메이터의 트리거 파라미터인 'Die' 파라미터를 SetTrigger() 메서드를 통해 작동시켜 사망 애니메이션이 실행되도록 한다. 

동시에 현재 캐릭터의 오디오 클립을 사망 오디오 클립으로 변경하고 재생해 사망시 사운드를 재생하고 속도를 0으로 만들어 화면 밑바닥에 멈추도록 한다. 

그리고 isDead 변수를 false로 처리해 Update() 메서드가 더이상 아무런 작업도 하지 않고 return되도록 한다.

**5. OnTriggerEnter2D() 메서드**

```
private void OnTriggerEnter2D(Collider2D other) {
    // 트리거 콜라이더를 가진 장애물과의 충돌을 감지
    if(other.tag == "Dead" && !isDead){
        Die();
    }
}
```

우리는 앞서 트리거 충돌을 자동으로 감지하는 OnTriggerEnter() 메서드를 사용했었다. 이 메서드의 2D 버전인 OnTriggerEnter2D() 메서드를 활용해 캐릭터 사망을 감지한다. 

처음에 만들어둔 'DeadZone' 오브젝트의 태그를 'Dead'로 설정하자. 캐릭터가 충돌한 트리거 콜라이더가 'Dead' 태그를 가지고 있고, 아직 사망상태가 아니라면 (!isDead) Die() 메서드를 실행해 사망을 처리한다. 

OnTriggerEnter () 메서드는 충돌한 상대 오브젝트의 정보를 받아 파라미터로 쓸 수 있다. 그래서 OnTriggerEnter2D(Collider2D other)로 'Collider2D other' 파라미터를 메서드에 추가해 준 것이다. 

이렇게 얻은 상대 오브젝트의 정보를 other 변수를 통해 접근해 해당 오브젝트의 태그가 'Dead' 인지 아닌지 파악해 사망을 처리한다.

**6. OnCollisionEnter2D() 메서드**

```
private void OnCollisionEnter2D(Collision2D collision) {
    // 바닥에 닿았음을 감지하는 처리
    if(collision.contacts[0].normal.y > 0.7f){
        isGrounded = true;
        jumpCount = 0;
    }
}
```

OnCollisionEnter2D() 메서드도 위와 유사하다! 

충돌을 감지하고 바닥에 닿았다면 isGrounded 변수를 true로 만들어 캐릭터가 점프중인지 달리는 중인지를 갱신한다. 

Collision2D같은 Collision 타입의 변수들은 앞서 말했듯이 충돌한 상대 오브젝트와 충돌에 대한 정보들을 담고있다. 충돌 지점들의 정보는 ContactPoint 타입의 데이터들을 'contacts'라는 배열로서 반환하는데, 이 배열의 길이는 충돌 지점의 수와 동일하다. 현재 게임 상황에서 충돌은 캐릭터의 하단부 1개밖에 없으므로contacts[0]을 통해 충돌 지점에 대한 정보에 접근할 수 있는 것이다.

그 후 normal을 통해 충돌 지점 표면의 방향을 나타내는 노말벡터에 접근하고, y를 통해 y좌표를 얻는다. 

노말벡터는 단위벡터로서 '방향'을 나타낸다. (0, 1)의 노말벡터는 '위쪽'을 의미하고 (0, -1)의 노말벡터는 '아래쪽'을 의미한다. 노말벡터의 y좌표가 0.7 이상이라는 것은, x좌표가 무엇이든 간에 '위쪽 방향'이며 '완만한 경사' 를 의미한다! 

충돌 지점 표면의 방향이 위쪽이며 너무 급하지 않은 경사라면 해당 조건문을 실행하게 되므로 '절벽'이나 '천장'을 바닥으로 인식하는 문제를 해결한 것이다. 어느정도 애매한 각도로 발판의 모서리에 진입하는 경우도 땅에 닿은것으로 처리할 수도 있게 되었다. 


**7. OnCollisionExit2D() 메서드**

```
private void OnCollisionExit2D(Collision2D collision) {
    // 바닥에서 벗어났음을 감지하는 처리
    isGrounded = false;
}
```

OnCollisionExit() 메서드이므로 어떤 콜라이더 오브젝트와 떼어진 경우를 의미한다. 즉 캐릭터가 땅에 닿아있지 않은 상태이므로 isGrounded 변수를 false로 만들어 점프 상태임을 나타내도록 처리했다. 

## 요약

1. Multiple 모드를 사용하면 하나의 스프라이트 파일을 여러개의 스프라이트 파일로 나누어 사용할 수 있다.
2. 오디오 소스 컴포넌트는 소리를 재생할 CD플레이어 같은 존재다
3. 오디오 클립은 컴포넌트에 들어가 재생될 오디오 파일(에셋)이다.
4. 오디오 소스 컴포넌트가 재생하는 소리는 오디오 리스너 컴포넌트가 듣는다.
5. 애니메이션창에 스프라이트를 배치하여 애니메이션 클립을 만들 수 있다.
6. 애니메이터 컨트롤러는 유한 상태 머신(FSM)으로 재생할 애니메이션을 결정하는 에셋이다.
7. 유한 상태 머신은 유한개의 상태를 가지고 있고, 한개의 상태만이 현재 상태가 될 수 있고, 전이를 통해 상태를 변화하도록 설계하는 모델이다.
8. 애니메이터 컴포넌트는 애니메이터 컨트롤러를 사용하여 애니메이션을 재생하는 컴포넌트이다. 
9. 애니메이터 창에서 파라미터를 추가하여 전이의 조건으로 활용할 수 있다.
10. 애니메이터에서 트리거 타입의 파라미터에는 값을 할당하지 않고, 트리거 타입의 파라미터를 발동시키는 방법으로 작동한다.
11. 다른 파라미터들은 Set 계열의 메서드로 파라미터에 새로운 값을 할당할 수 있다.
12. 2D 콜라이더에 대한 충돌 이벤트 메서드는 OnTriggerEnter2D() 같은 2D 계열의 메서드를 사용해야 한다.
