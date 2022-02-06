# 5. 게임 오브젝트 제어하기

 객체지향을 이용해 클래스와 오브젝트(객체)를 다뤄보자
 
## 클래스와 오브젝트
게임내에서의 지형, NPC, 몬스터 하나하나는 오브젝트(객체)다. 그리고 이 오브젝트들은 클래스를 통해 하나씩 생성되어 게임 내에서 사용된다. 

즉 객체지향과 동일하다. 

같은 클래스에서 찍어낸 각각의 오브젝트는 물론 다른 클래스에서 나온 오브젝트끼리는 독립성을 지닌다. 한 오브젝트가 어떤 행동할 하거나 죽는 것이 다른 오브젝트에 영향을 미치지 않는다.

## C# 클래스 만들기

<p align = "center">
<img width="539" alt="image" src="https://user-images.githubusercontent.com/68016394/152676713-029f8572-f07a-4475-84cd-d356d7e63375.png">
Unity에서 C# 스크립트 만들기
</p>

위의 경로를 통해 C# 스크립트를 만들면 유니티의 Asset에 만든 스크립트 파일이 보인다. 해당 스크립트 파일을 클릭하면 IDE를 통해 C# 코드를 작성하고 저장할 수 있다. 

<p align = "center">
<img width="480" alt="image" src="https://user-images.githubusercontent.com/68016394/152676938-871b6fe1-fa88-42e8-bf15-86b932e743f9.png">
C# 스크립트
</p>

Animal 클래스를 만들고 필드 변수로 이름(name)과 울음소리(sound) 그리고 메서드로 이름과 울음소리를 로그로 찍도록 만들었다.

현재 MonoBehaviour 클래스를 Animal 클래스가 상속받지 않아 실제 Unity에서 컴포넌트로 만들 수 없다. 

이제 Animal 클래스를 기반으로 Animal 오브젝트를 만드는 Zoo 스크립트를 만들자

<p align = "center">
<img width="425" alt="image" src="https://user-images.githubusercontent.com/68016394/152685781-0a58248e-7e92-449d-9400-9da2aae0eb68.png">
Zoo 클래스
</p>

Animal 클래스의 객체인 Tom을 만들어 이름과 울음소리를 설정하고 메서드를 실행시키는 스크립트, MonoBehaviour을 상속받으므로 Unity에서 컴포넌트로 추가할 수 있다.

이제 Hierarchy 창에서 Create > Create empty로 빈 오브젝트를 만들고 만들어진 컴포넌트에 Zoo 스크립트를 Drag&Drop을 하면 컴포넌트로 추가할 수 있다.

그리고 실행을 해보면 console에 로그로 "냐옹!"이 찍히는 것을 확인할 수 있다.

<p align = "center">
<img width="1176" alt="image" src="https://user-images.githubusercontent.com/68016394/152686020-8520e00c-637d-401f-8dad-62240e30c41c.png">
Zoo 컴포넌트를 담은 오브젝트 실행 결과
</p>

## *참조타입에 대한 고찰
Tom 말고 Jerry라는 Animal 오브젝트를 Zoo 스크립트안에서 만든 뒤 name을 jerry, sound를 찍찍!으로 설정해보자.
 
그리고 

jerry = tom; 

이라는 코드를 입력해보자.

jerry, tom같은 객체명은 참조타입이기에 jerry, tom이 각각 가지고 있는 멤버들의 메모리 주소를 지니게 된다. jerry와 tom을 통해 해당 메모리에 접근할 수 있는 것이다(포인터처럼)

jerry = tom;

jerry.name = "제리";

를 실행하면 jerry는 tom의 멤버를 가리키게 되고 그 후 jerry를 통해 name을 수정하게 되면

tom.name도 "제리"로 변경되게 된다.

<p align = "center">
<img width="538" alt="image" src="https://user-images.githubusercontent.com/68016394/152686569-a04b85f6-9a4a-43f3-94ae-4f4e0202ef52.png">
위 내용을 담은 Zoo 스크립트 코드
</p>

<p align = "center">
<img width="433" alt="image" src="https://user-images.githubusercontent.com/68016394/152686733-841714e4-c410-4937-b4d4-9dde0b662832.png">
스크립트 코드 실행 console 결과
</p>

그 결과 위의 그림처럼 jerry를 통해 tom의 name이 수정된 것을 확인할 수 있다.

객체지향의 참조타입(reference type)과 원시타입(primitive type)의 중요한 차이점을 알 수 있는 내용이라 따로 정리해보았다. 

## 변수로 컴포넌트 사용하기

변수의 타입을 참조타입으로 설정하면 변수를 통해 오브젝트와 컴포넌트에 접근해 이들을 조종할 수 있다. 이를 활용해보자

우선 Hierarchy에서 Create > 3D object > Cube를 통해 큐브 오브젝트를 생성하고 생성한 큐브의 Inspector 창에서 Add component > Physics > Rigidbody 컴포넌트를 추가해 물리법칙에 영향을 받도록 하자.

### 변수로 Rigidbody 컴포넌트 사용하기
참조타입의 변수로 오브젝트를 가리킬 수 있다.

즉, Rigidbody 타입의 변수는 Rigidbody 컴포넌트를 가진 오브젝트를 가리키고 다룰 수 있다. (이를 통해 유니티의 컴포넌트들은 클래스로 만들어져 있다는 것을 알 수 있다!)

<p align = "center">
<img width="450" alt="image" src="https://user-images.githubusercontent.com/68016394/152688425-75594778-cfbb-40e7-a70e-e6671b6b69a0.png">
Jumper 스크립트
</p>
 
 Jumper C# 스크립트를 만들고 rigidbody 타입의 변수 myRigidBody를 만들어 AddForce 메서드를 실행하는 코드다. 
 
<p align = "center">
<img width="450" alt="image" src="https://user-images.githubusercontent.com/68016394/152688643-b248ea81-1684-4753-9363-86ac3cbddbe2.png">
추가한 Jumper 컴포넌트에 오브젝트 할당
</p>

이렇게 추가했으면 Jumper 스크립트의 컴포넌트를 Inspector창에서 설정할 수 있다. 

스크립트상으로 public으로 선언된 변수는 Inspector창에서 만질 수 있는데 myRigidBody변수는 public이었으므로 Inspector창에 표시된다. 

myRigidBody.Addforce();

위의 코드는 변수 myRigidBody가 가리키는 오브젝트에 접근해 Addforce() 메서드를 실행하는 코드인데 현재 아무런 오브젝트도 myRigidBody 변수에 할당되어 있지 않으므로 에러가 난다.

위의 그림처럼 Cube 오브젝트와 Jumper 컴포넌트의 Rigidbody타입 변수에 할당해주면 정상적으로 실행된다. 

즉 위처럼 Jumper 스크립트의 myRigidBody변수에서 실제 큐브 오브젝트의 Rigidbody 컴포넌트로 향하는 참조가 할당된다. 

여기서는 변수 myRigidBody가 실제로 사용되는 것이 아니라 myRigidBody가 가리키는 실체(큐브 오브젝트의 Rigidbody 컴포넌트)가 사용된다는 점에 주목하자. 


