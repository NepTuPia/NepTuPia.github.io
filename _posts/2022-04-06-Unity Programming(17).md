# 2D 러너 게임 '유니런' 제작 - 배경 스크롤링과 게임 매니저(2)

저번시간에 이어 이제 게임 운영을 담당할 게임 매니저를 만들어보자! 유니런에서 게임매니저가 할 역할은 다음과 같다.

1. 점수 저장
2. 게임오버 상태 표현
3. 플레이어의 사망을 감지해 게임오버 처리 실행
4. 점수에 따라 점수 UI 텍스트 갱신
5. 게임오버되었을 때 게임오버 UI 활성화

##싱글턴 패턴과 Static의 활용

게임 매니저처럼 관리자역할을 하는 오브젝트는 다음과 같은 조건을 따라야 한다.

**1. 게임 씬 내에 단 하나만 존재**

당연히 관리자가 여러명 존재하게되면 최고점수가 2개 존재하는 등 논리적으로 모순되는 상황이 발생한다. 
	
**2. 어느 오브젝트에서든 손쉽게 접근 가능**

어느 오브젝트든 손쉽게 매니저 오브젝트에 접근해서 정보를 주고받을 수 있어야 매끄럽게 게임이 작동할 것이다.
	
이러한 조건을 구현하기 위해 주로 '싱글턴'이라는 디자인 패턴을 활용한다. 그리고 싱글턴 패턴을 구현하기 위해서 Static 변수를 활용한다. Static 키워드는 지역변수처럼 일시적으로, 해당 클래스나 함수 안에서만 유효한 것이 아니라 컴파일시에 전역변수처럼 선언되도록 만들어준다. 즉 그말은 여러번 객체가 만들어지거나 함수가 여러번 실행되어도 정적 객체는 하나만 존재하게되고, '클래스이름.변수이름'의 방식으로 손쉽게 어느곳에든 전역변수처럼 접근할 수 있으므로 싱글턴 패턴의 조건을 충족할 수 있다.

이제 이를 활용해 아래처럼 Game Manager의 스크립크 코드를 완성하자.

```
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

// 게임 오버 상태를 표현하고, 게임 점수와 UI를 관리하는 게임 매니저
// 씬에는 단 하나의 게임 매니저만 존재할 수 있다.
public class GameManager : MonoBehaviour {
    public static GameManager instance; // 싱글톤을 할당할 전역 변수

    public bool isGameover = false; // 게임 오버 상태
    public Text scoreText; // 점수를 출력할 UI 텍스트
    public GameObject gameoverUI; // 게임 오버시 활성화 할 UI 게임 오브젝트

    private int score = 0; // 게임 점수

    // 게임 시작과 동시에 싱글톤을 구성
    void Awake() {
        // 싱글톤 변수 instance가 비어있는가?
        if (instance == null)
        {
            // instance가 비어있다면(null) 그곳에 자기 자신을 할당
            instance = this;
        }
        else
        {
            // instance에 이미 다른 GameManager 오브젝트가 할당되어 있는 경우

            // 씬에 두개 이상의 GameManager 오브젝트가 존재한다는 의미.
            // 싱글톤 오브젝트는 하나만 존재해야 하므로 자신의 게임 오브젝트를 파괴
            Debug.LogWarning("씬에 두개 이상의 게임 매니저가 존재합니다!");
            Destroy(gameObject);
        }
    }

    void Update() {
        // 게임 오버 상태에서 게임을 재시작할 수 있게 하는 처리
        if (isGameover && Input.GetMouseButtonDown(0)){
            // 게임 오버 상태에서 마우스 왼쪽 버튼을 클릭하면 현재 씬 재시작
            SceneManager.LoadScene(SceneManager.GetActiveScene().name);
        }
    }

    // 점수를 증가시키는 메서드
    public void AddScore(int newScore) {
        //게임오버 상태가 아니면
        if(!isGameover){
            // 점수 증가
            score += newScore;
            scoreText.text = "Score : " + score;
        }
    }

    // 플레이어 캐릭터가 사망시 게임 오버를 실행하는 메서드
    public void OnPlayerDead() {
        // 캐릭터 사망 처리
        isGameover = true;
        // 게임오버 UI 활성화
        gameoverUI.SetActive(true);
    }
}
```

이제 다른 스크립트들과 연결지어보자. 

**PlayerController 스크립트 수정**

OnPlayerDead() 메서드는 PlayerController 스크립트에서 호출되어야 한다. 그러므로 PlayerController 스크립트의 Die() 메서드에서 OnPlayerDead() 메서드를 호출하게 하자. 아래와 같이 스크립트를 수정하자.

```
//PlayerController 스크립트의 Die() 메서드 수정
private void Die() {
    // 사망 처리
    animator.SetTrigger("Die");

    playerAudio.clip = deathClip;

    playerAudio.Play();

    playerRigidbody.velocity = Vector2.zero;

    isDead = true;
    
    //게임매니저의 메서드 호출
    GameManager.instance.OnPlayerDead();
}
```

게임매니저는 전역변수로서 설정해뒀으므로 GameManager.instance로 접근했다. 
GamaManager 클래스의 instance 변수에 접근한 것과 동일하다.

**ScrollingObject 스크립트 수정**

게임오버 상태라면 발판과 배경이 움직이면 안된다. 이를 구현해보자. 

```
//ScrollingObject 스크립트의 Update() 메서드 수정
private void Update() {
    // 게임 오버 상태가 아닐때만 평행이동 수행
    if (!GameManager.instance.isGameover){
        // 게임 오브젝트를 왼쪽으로 일정 속도로 평행 이동하는 처리
        transform.Translate(Vector3.left * speed * Time.deltaTime);
    }
}
```

Translate() 메서드를 게임 오버 상태가 아닐때만 작동하도록 바꿔주면 된다.

마지막으로 아래처럼 GameManager 컴포넌트에서 변수들에 오브젝트들을 할당해주자. Score Text와 Gameover UI에 알맞은 오브젝트를 넣어주자.

![image](https://user-images.githubusercontent.com/68016394/161978811-62a7996d-974a-48af-9ce5-c2dca100081c.png)

게임매니저까지 다 완성했다! 

## 요약

1. 2D 게임 오브젝트를 그리는 순서는 정렬 레이어로 조정한다.
2. 캔버스 스케일러 컴포넌트의 스케일 모드를 통해 다양한 해상도에 대응하도록 설정할 수 있다.
3. '고정 픽셀 크기' 모드와 '해상도에 따른 스케일' 모드를 적절히 사용하자.
4. static의 특징을 활용해 싱글턴 패턴을 구현해 게임 매니저를 만들 수 있다. 
5. 싱글턴 패턴은 '단 하나만 존재해야 하며, 손쉽게 접근 가능한' 오브젝트를 구현하는 디자인 패턴이다.

 
	