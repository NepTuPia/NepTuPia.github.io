# 탄막 슈팅 게임'닷지' - 최종 완성

---

앞서서 UI까지 제작을 완료했다. 이제 이 UI들과 게임을 전반적으로 관리할 게임매니저를 제작해보자. 

## 게임매니저 제작

게임의 규칙과 게임오버 상태, 생존 시간 등의 수치를 관리하고, 게임 UI를 갱신하는 게임 매니저(Game Manager)를 만들어보자. 닷지 게임에서 게임매니저는 다음과 같은 기능을 한다.

1. 게임오버 상태 표현
2. 생존 시간 갱신
3. UI를 갱신하고 표시
4. 게임오버 시 게임 재시작

**게임매니저 스크립트 준비**

게0임 매니저 스크립트를 만들고 아래와 같이 작성하자.

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; //UI 관련 라이브러리
using UnityEngine.SceneManagement; //씬 관련 라이브러리

public class GameManager : MonoBehaviour
{
    public GameObject gameoverText; //게임오버 시 활성화 할 텍스트 게임 오브젝트
    public Text timeText; //생존 시간을 표시할 텍스트 컴포넌트
    public Text recordText; //최고 기록을 표시할 텍스트 컴포넌트

    private float surviveTime; //생존 시간
    public bool isGameOver; //게임오버 상태

    void Start(){
        //생존시간과 게임오버 상태 초기화
        surviveTime = 0;
        isGameover = false;
    }

    void Update(){
        
    }

    //현재 게임을 게임오버 상태로 변경하는 메서드
    public void EndGame(){

    }
}

```

UI와 씬을 관리하기 위해 관련된 라이브러리들을 불러들어왔다.  그 외에 필요한 필드와 메서드를 작성했다. 

**필드 변수들**

gameoverText는 자료형이 GameObject로, timeText와 recordText는 Text 자료형으로 선언되었다는 것을 주목하자.

**우리는 유니티에서 어떤 게임 오브젝트의 컴포넌트를 해당 컴포넌트 타입의 변수를 선언함으로써 사용할 수 있었다.** recordText와 timeText는 실시간으로 내용이 변해야한다. 그러므로 Text 컴포넌트 타입으로 선언해서 Text 컴포넌트의 text에 접근해서 출력 내용을 변경할 수 있도록 한다. 이와 달리 GameverText는 그 내용은 변하지 않고 활성화할지 말지만 바뀌면 되므로 게임 오브젝트를 나타내는 타입인 gameObject로 선언한 것이다


**생존시간 측정 및 출력** 

이제 생존시간을 측정해보자. Update() 메서드와 Time.deltaTime을 활용해 현재 얼마나 플레이어가 생존했는지 알 수 있다. 아래와 같이 Update() 메서드를 수정하자.

```
void Update(){
    
    if(!isGameOver){
        surviveTime += Time.deltaTime;
        timeText.text = "Time: " + (int)surviveTime);
    }
}
```

게임오버 상태가 아니라면 시간을 계속 더해나가고, timeText 변수를 활용해 text 컴포넌트에 접근한 뒤 텍스트 내용을 현재 생존 시간을 표시하도록 수정해주자. Update() 메서드이므로 매 프레임마다 메서드가 실행되므로 자동으로 생존시간으 누적되고 화면에 표시될 것이다. 

**게임 재시작**

게임을 재시작한다는 얘기는 현재 씬을 종료하고 새로운 씬을 실행한다는 의미이다. 유니티에서 씬은 하나의 게임 월드이므로 현재 씬을 해제하고 다른 씬을 새로 로드하면 다른 게임 월드로 전환되므로 새롭게 게임을 시작할 수 있다. 

아래와 같이 update() 메서드를 수정하자

```
void Update(){
    
    if(!isGameOver){
        surviveTime += Time.deltaTime;
        timeText.text = "Time: " + (int)surviveTime);
    }
    else{
        if(Input.GetKeyDown(KeyCode.R)){
            SceneManager.LoadScene("SampleScene");
        }
    }
}
```

Input.GetKeyDown() 메서드는 키 입력을 받을 때 까지 기다린다. 그러므로 유저가 재시작을 하기 전까지 대기할 수 있다. R을 입력하면 SceneManager가 실행된다.

SceneManager은 SceneManagement 라이브러리에서 가저온 유니티에 내장된 씬 관리자이다. LoadScene() 메서드로 실행할 씬의 이름을 입력받아 해당 씬을 실행할 수 있다. 

**EndGame() 메서드 구현**

마지막으로 현재 게임을 게임오버 상태로 만드는 EndGame() 메서드를 구현하자. 이 메서드는 플레이어가 죽을 때 실행되며 현재 게임 상태를 게임오버 상태로 변경하고 게임오버 시 필요한 처리를 실행하는 메서드이다. 그러므로 다음과 같은 기능을 한다.

1. 게임오버 상태은 isGameover을 true로 변경
2. 현재 생존 시간 기록과 최고 생존 기록을 비교
3. 게임오버 UI들을 활성화한다.

이렇게 만든 EndGame() 메서드는 플레이어의 스크립트에서 실행할 것이다. 그렇게하면 플레이어가 사망할 때 자동으로 EndGame() 메서드가 실행되게 할 수 있다. 

```
//현재 게임을 게임오버 상태로 변경하는 메서드
public void EndGame(){
    //게임 오버 상태를 true로 변경
    isGameOver = true;
    //게임오버UI 오브젝트를 SetActive()메서드로 활성상태로 변경
    gameoverText.SetActive(true);
}
```

isGameOver 변수를 false에서 true로 변경해 게임오버 상태임을 나타내자. 그 후 아래 코드를 보자. gameoverText 변수는 타입으로 GameObject로 설정해 게임 오브젝트를 가리키도록 설정했다. 그러므로 SetActive() 메서드를 사용해 게임오버시 출력할 UI 오브젝트들을 활성상태로 변경한다.

**최고기록 저장 및 불러오기**

아직 EndGame() 메서드에서 해야 할 일이 남아있다. 최고기록을 관리하는 일이 필요하다. 

유니티에는 기본 내장 클래스로 **PlayerPrefs**를 지원한다. 플레이어 설정이라는 클래스 명 그대로, 어떤 값들을 로컬에 저장하고 불러오는 것을 지원해 게임을 종료한 후에도 계속해서 어떤 정보를 저장할 수 있도록 해준다.

저장에는 파이썬의 사전처럼 키와 값의 쌍으로 저장한다. SetFloat로 float 타입의 값을 저장할 수 있고 GetFloat로 다시 불러들어올 수 있다.

```
PlayerPrefs.SetFloat("Gold", 50);

float gold = PlayerPrefs.GetFloat("Gold");
```

위의 코드는 "Gold"라는 키값으로 50을 로컬에 저장하고 gold라는 변수에 저장해둔 "Gold" 값을 불러들어오는 코드이다.

주의할점은 int, string의 타입도 지원한다는 점이다. float로 저장해놓고 int로 불러들어오면 불러들어올 키가 존재하지 않으므로 기본값인 0이 반환되게 된다. PlayerPrefs를 활용해 나머지 EndGame() 메서드를 완성해보자.

```
//현재 게임을 게임오버 상태로 변경하는 메서드
public void EndGame(){
    //게임 오버 상태를 true로 변경
    isGameOver = true;
    //게임오버UI 오브젝트를 SetActive()메서드로 활성상태로 변경
    gameoverText.SetActive(true);

    // BestTime을 키값으로 지금까지의 최고기록을 불러오기
    float bestTime = PlayerPrefs.GetFloat("BestTime");

    if(surviveTime > bestTime){
        //현재 생존기록이 최고기록보다 크다면 최고기록 갱신
        bestTime = surviveTime;
        //갱신하고 SetFloat()메서드를 활용해 로컬에도 저장
        PlayerPrefs.SetFloat("BestTime", surviveTime);
    }

    //현재까지의 최고기록을 출력
    recordText.text = "Best Time: " + (int)bestTime;
}
```

우선 PlayerPrefs.GetFloat("BestTime")으로 최고기록을 불러들인다. 아직 최고기록이 없다면 기본값인 0이 리턴되므로 걱정없다!

그 후 생존기록이 최고기록보다 크다면 최고기록을 갱신하고 로컬에 저장까지 해주어 계속해서 최고기록이 유지될 수 있도록 코드를 작성했다.

마지막으로 text 타입의 변수인 recordText를 활용해 최고기록을 출력하는 UI 오브젝트의 출력 내용을 현재 최고기록을 출력하도록 한다.

**playerController 스크립트 수정**

플레이어가 죽을 때 EndGame() 메서드를 실행하도록 스크립트를 수정해주자. 

```
public void Die(){
    //자신의 게임 오브젝트 비활성화
    gameObject.SetActive(false);

    //씬에 존재하는 GameManager 타입의 오브젝트를 찾아서 가져오기
    GameManager gameManager = FindObjectOfType<GameManager>();
    //가져온 GameManager 오브젝트의 EndGame() 메서드 실행
    gameManager.EndGame();
}
```

FindObjectOfType<>() 메서드는 제네릭으로 선언된 타입의 오브젝트를 씬에서 찾아 반환하는 메서드였다. 게임매니저는 스크립트 파일명이 GameManager였으므로 게임매니저의 타입은 GameManager이다.(클래스를 타입처럼 사용하는 것을 기억하자!) 그러므로 gameManager 변수에는 게임매니저가 할당되게 되고 EndGame() 메서드를 플레이어가 사망 시 자동으로 실행할 수 있게 된다. 

**게임매니저 오브젝트 설정**

이렇게 게임매니저를 위한 스크립트를 다 작성했으므로 게임매니저를 담당할 오브젝트를 만들고 스크립트를 컴포넌트로 넣어주자.

Hierarchy창에서 빈 오브젝트를 만들고 Game Manager로 이름을 변경한 뒤 만들어둔 스크립트를 컴포넌트로 넣어주자. 

그리고 Inspector창에서 스크립트 내의 변수들이 지목할 오브젝트들을 설정해주자. 

<p align = "center">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/68016394/155504970-f89c043c-ae64-4777-ba60-17ac557860c4.png">
게임매니저 오브젝트 생성 및 스크립트 변수에 UI 오브젝트 할당
</p>

이제 각각의 텍스트들이 스크립트에서 작성한 대로 작동이 될 것이다!

이렇게 우리의 첫 게임인 닷지가 최종적으로 완성되었다!

## 빌드하기

이제 만든 게임을 빌드해서 다른 사람에게 배포할 수 있도록 만들어보자.

우선 빌드한 파일을 저장할 폴더를 아무대나 만들어두자.

그 뒤에 File > Build Settings로 빌드 설정 창을 열자. 그리고 Build and Run을 누르면 파일 탐색기가 자동으로 띄어지고 아까 만들어둔 폴더를 선택한 뒤에 Save를 눌러 빌드를 진행하자. 

<p align = "center">
<img width="1334" alt="image" src="https://user-images.githubusercontent.com/68016394/155507691-9e297f52-736e-4bfc-a4d8-dc3679ac3569.png">
빌드완료 후 실행할 수 있는 app확장자의 파일이 생성
</p>

## 요약

1. 프로젝트 창에서 폴더를 만들어 Assets를 정리할 수 있다.
2. transform.Rotate()로 게임 오브젝트를 회전시킬 수 있다.
3. Update()메서드에서 단위 시간을 활용하려면 Time.deltaTime을 활용하자
4. 모든 UI 오브젝트는 Canvas 오브젝트의 자식이 되어야 한다.
5. 텍스트 컴포넌트가 출력하는 텍스트는 Text 타입의 변수를 통해 text 필드에 접근해서 변경할 수 있다.
6. PlayerPrefs 클래스와 내부 매서드를 활용해서 값을 로컬에 저장하고 불러올 수 있다.
7. PlayerPrefs는 키-값 방식으로 값을 저장하고 검색한다.
8. SceneManaer.LoadScene() 메서드로 씬 이름을 입력받아 해당 씬을 로드한다.
9. 빌드 설청 창은 File > Build settings로 진입한다.
10. 빌드 설정 창에서 Build 혹은 Build and Run으로 게임을 빌드해서 배포할 수 있다.