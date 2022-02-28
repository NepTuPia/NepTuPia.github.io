# 벡터

---

앞의 글에서 말한 대로 이번에는 책으로는 9장의 내용이다. 유니티에서 벡터에 대한 기본적인 개념과 수학적 개념들, 그리고 쿼터니언에 대해 배워보자.

**1. 벡터의 절대 위치와 상대 위치**

벡터는 우리가 좌표상으로 인식하는 그 벡터를 의미한다. (0, 0)이라면 x, y좌표가 각각 0이라는 의미이다. 

다만 (1, 1)이라는 벡터를 예로 들면 이 벡터는 2가지의 의미를 가진다.

1. 상대적인 방향과 크기<br>벡터의 시작 좌표가 정해지지 않았을 때 그냥 (1, 1)의 벡터는 어디서부터 시작인지 알 수가 없다. 그저 방향과 크기만 벡터를 통해 알 수 있다.
2. 절대적인 위치<br> 벡터의 시작 좌표가 원점등으로 정해져있거나 알 수 있는 경우 (1, 1)이라는 벡터는 좌표계 상에서 절대적인 위치와 방향, 크기를 모두 알 수 있다.

**2. 벡터의 크기**

우리가 아는 그 피타고라스 공식이다. (1, 1)의 벡터는 2제곱근의 크기를 지닌다. 

**3. 스칼라 곱**

벡터에 스칼라, 즉 어떤 상수를 곱할 수 있다. (1, 1)의 벡터에 3을 곱하면 (3, 3)이 되고 그 크기도 정확히 3배가 된다. 

**4. 방향 벡터**

공업수학에서 배운 그것, 크기가 1인 벡터이다. (3, -3)의 벡터가 있다면 벡터의 각 좌표를 크기로 나눠주면 크기가 1인 벡터로 만들 수 있다. 그리고 크기가 1인 벡터는 속력이 1이라고 표현할 수도 있다. 

**5. 벡터의 덧셈**

벡터의 덧셈은 같은 성분끼리 더해주면 된다. 좌표계상에서 살펴보면, A(1, 1) 벡터와 B(2, 3)벡터가 있다면 A + B = (1 + 2, 1 + 3) = (3, 4)이다. 이는 즉 A벡터만큼 이동한 후 B벡터만큼 이동한 후의 결과에 대한 값이다. 

**6.벡터의 뺄셈**

벡터의 뺄셈은 같은 성분끼리 뻴셈으로 구하며 두 벡터 사이에 한 벡터가 다른 벡터에 도달하기 위한 '거리와 방향'이다. 

예를들어 A(3, 0)벡터와 B(10, 0)벡터가 있다고 가정해보자. B - A = (10 - 3, 0 - 0) = (7, 0)이다. 이는 A벡터와 B벡터 사이의 간격이 7만큼이고 A벡터에서 B벡터로 가기 위해선 (7, 0)만큼의 방향과 크기로 가야 한다는 것을 의미한다.

반대로 A - B = (3 - 10, 0 - 0) = (-7, 0)이다. 이는 B벡터에서 A벡터로 가기 위해선 (-7, 0)만큼의 방향과 크기로 가야 한다는 것을 의미한다. 

**7. 벡터의 내적**

벡터의 내적은 한 벡터에서 다른 벡터로의 '투영'이다.

<p align = "center">
![vector product](https://wikidocs.net/images/page/22384/inner_product.png)

위의 그림을 보면 이해하기 쉬울 것이다.

그렇다면 벡터의 내적이 왜 중요한가?

두 벡터 사이의 각도가 커질수록 벡터 내적의 결과는 작아진다. 이를 활용하면 두 벡터 사이의 거리를 계산할 수 있다. 

두 벡터 사이의 각도가 0이면, 즉 방향이 일치하면 내적의 값은 1이다. 각도가 90이면 0이 되고 180이면 -1이다. 이렇게 두 벡터 사이의 각도를 내적을 통해 알아낼 수 있다. 

이를 활용하면 게임 오브젝트사이의 거리, 예를들어 탱크 몸체와 포신 사이의 각도, 플레이어의 시선과 실제로 이동하는 방향 사이의 각도 등을 알 수 있다. 

**8. 벡터의 외적**

벡터의 외적은 두 벡터를 모두 수직으로 통과하는 벡터를 구하는 연산이다.

벡터의 내적은 연산 결과가 숫자이지만, 외적의 결과는 또다른 '벡터'이다. 연산식은 X를 쓰며 두 벡터 A와 B에 대해 외적 벡터 C는 A X B = C로 나타낸다. 

<p align = "center">
![vector cross](data:image/png;base64,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)

두 벡터를 모두 수직으로 통과하는 벡터를 공간상에서 생각해보자. 서로의 기저벡터가 1이나 -1의 곱으로 같아질 수 없는 벡터(즉, 일직선상에 존재하는 벡터)가 아닌 두 벡터는 한 평면(Plane)을 결정할 수 있다. 즉 두 벡터의 외적의 결과 벡터는 한 평면에 대해 수직인 벡터이다. 

이를 활용하면 "어떤 표면에 대해 수직인 방향"을 게임 내에서 구할 수 있다. 또한 A X B = C에서 순서를 바꾸면 B X A = -C가 된다. A와 B가 만들어내는 평면, 표면에 대해 해당 표면이 바라보는 방향, 즉 '평면의 방향'을 알 수 있다!

이런 평면의 방향을 나타내는 벡터를 '노말벡터'라고 하며, 평면상의 두 벡터를 외적하여 구할 수 있다. 

## 유니티의 C# 벡터

유니티에서는 vector 종류 타입을 활용해 벡터를 사용할 수 있다. 앞서 다뤘던 vector3 타입 외에도 vector2, vector 4도 존재한다.

```
new vector2(x, y);
new vector3(x, y, z);
new vector4(x, y, z, w);
```

위처럼 객체를 만들어 각 타입의 벡터 변수를 만들어 사용한다.

다만 vector타입들은 클래스가 아니라 구조체(Struct)로 선언되어 있다. 그러므로 레퍼런스 타입처럼 작동하지 않고 기본타입들처럼 작동하므로 조심해서 사용하자.

**스칼라 곱**

```
Vector3 a = new Vector3(3, 6, 9);
a = a * 10;
```

위의 코드처럼 * 연산자를 통해 간단하게 할 수 있다.

**벡터 덧셈과 뺄셈**

```
Vector3 a = new Vector3(3, 6, 9);
Vector3 b = a + a;
Vector3 c = b - a;
```

벡터끼리의 덧셈과 뺄셈도 +, -로 구할 수 있다.

**벡터의 정규화**

```
Vector3 a = new Vector3(3, 6, 9);
Vector3 b = a.normalized;
```

normalized 메서드로 간단히 벡터를 정규화해 방향벡터를 구할 수 있다.

**벡터의 크기**

```
Vector3 a = new Vector3(3, 6, 9);
Vector3 b = a.magnitude;
```

magnitude 메서드로 벡터의 크기를 구할 수 있다.

**벡터의 내적**

```
Vector3 a = new Vector3(3, 3, 3);
Vector3 b = new Vector3(1, 2 ,3);
float c = Vector3.Dot(a, b);
```

Vector3.Dot() 메서드로 두 벡터의 내적을 구할 수 있다. 이때의 결과는 어떠한 수 이므로 기본 타입의 변수에 담아야 한다.

**벡터의 외적**

```
Vector3 a = new Vector3(3, 3, 3);
Vector3 b = new Vector3(1, 2 ,3);
Vector3 c = Vector3.Cross(a, b);
```

Vector3.Cross() 메서드로 두 벡터의 외적 벡터를 구할 수 있다. 이떄의 결과는 벡터이므로 Vector 종류의 타입에 담아야 한다.

# 벡터 활용

배운 활용법을 사용해보자. currentPos와 destPos 2개의 벡터 변수가 있다고 가정하자. currentPos는 플레이어의 현재 위치를 나태나고 destPos는 플레이어가 가고자 하는 목표 위치를 나타낸다.

```
Vector3 currentPos = new Vector3(1, 0, 1);
Vector3 destPos = new Vector3(5, 3, 5);
```

그렇다면 플레이어가 현재 위치에서 목적지까지의 벡터는 destPos - currentPos로 나타낼 수 있다. 

그렇다면 플레이어가 가야하는 벡터의 크기(즉 플레이어와 목적지 사이의 거리)와 방향벡터는 아래처럼 간단히 구할 수 있다!

```
Vector3 currentPos = new Vector3(1, 0, 1);
Vector3 destPos = new Vector3(5, 3, 5);

Vector3 move = destPos - currentPos;

float distance = move.magnitude;
Vector3 direction = move.normalize;
```

혹은 거리를 구할 때에는 내장된 메서드인 distance를 활용해

```
Vector3 currentPos = new Vector3(1, 0, 1);
Vector3 destPos = new Vector3(5, 3, 5);

float distance = Vector3.Distance(currentPos, destPos);
```

로 구할수도 있다.

목적지를 향한 방향벡터를 구했으므로 다음처럼 특정 거리만큼 이동한 후의 위치를 스칼라곱을 통해 구할 수도 있다!

```
Vector3 currentPos = new Vector3(1, 0, 1);
Vector3 destPos = new Vector3(5, 3, 5);

Vector3 move = destPos - currentPos;

float size = move.magnitude;
Vector3 direction = move.normalize;

//목적지를 향해 10만큼 이동
currentPos = currentPos + direction * 10
```

플레이어의 위치인 currentPos 벡터에서 목적지를 향해 '10'만큼 이동한 벡터를 구하는 과정이다.

# 쿼터니언

Transform 컴포넌트는 3개의 멤버 변수로 구성되어 있다. position, localScale, rotation이다. 이중 position과 localScale은 Vector3 타입이지만 rotation은 quaternion(쿼터니언) 타입이다. 그러므로 아래와 같은 코드는 에러를 뱉는다.

```
transform.position = new Vector3(0, 0, 10);
transform.localScale = new Vector3(1, 5, 10);

// roation은 Vector3타입이 아니므로 에러 발생
transform.rotation = new Vector3(1, 5, 3);
```

쿼터니언은 x, y, z외에도 w값을 가진다. 하지만 분명히 Transfrom 컴포넌트의 Inspector창에서 rotation 멤버 변수는 x, y, z 3개의 값만 입력받는다. 

쿼터니언을 제대로 이해할려면 어려운 수학적 내용을 이해해야 한다. 간단히 설명해보자. 3D물체의 회전을 3D 벡터를 활용해 표현하는 것을 '오일러각'이라고 한다. 하지만 회전시 두개의 축이 겹치게 되어 더이상 온전히 회전을 표현할 수 없게 되는 '짐벌락'이라는 현상때문에 3개의 성분만으로 3D공간에서 물체의 회전을 표현할 수 없다. 

이를 해결하기 위해 유니티에서는 쿼터니언이라는 체제를 도입해 물체의 회전을 표현했지만, 개발자가 직접 다루도록 두기엔 너무 어렵고 에러의 위험도 커 직접 쿼터니언 방식에 접근하는것을 막고 x, y, z의 Vector3 타입으로 다룰 수 있도록 배려해 준 것이다. 

**쿼터니언 활용**

* 새로운 회전 데이터 생성

오일러각을 표현하는 Vector3 타입의 값에서 새로운 Quaternion 값을 생성할 수 있다.

`Quaternion rotation = Quaternion.Euler(new Vector3(0, 60, 0);`

* 회전을 Vector3(오일러각)로 가져오기

Quaternion 타입은 위의 생성과 반대로 저장된 회전값을 Vector3 타입의 오일러값으로 도로 뱉어낼 수 있다.

```
Quaternion rotation = Quaternion.Euler(new Vector3(0, 60, 0);

Vector3 eulerRotation = rotation.eulerAngles;
```

eulerAngles 메서드로 변환할 수 있다!

* 현재 회전에서 '더' 회전하기

(30, 0, 0)만큼 회전한 상태에서 (0, 60, 0)만큼 더 회전한 상태를 표현해보자. 

중요한 점은 (30, 0, 0)을 회전한 상태에서 (0, 60, 0)을 추가로 회전하는 것과 (30, 60, 0)을 한번 회전하는 것은 전혀 다른 회전이라는 것이다. 

```
Quaternion a = Quaternion.Euler(30, 0, 0);
Quaternion b = Quaternion.Euler(0, 60, 0);

Quaternion rotation = a * b;
```

쿼터니언에서 a에서 b만큼의 추가 회전은 +가 아니라 *를 통해 나타낸다. 쿼터니언 연산에는 행렬이 사용되기 때문이다. 

쿼터니언에 대한 더 많은 사용과 이해는 다음장에서 다룰 것이다.

짐벌락과 쿼터니언의 이론에 대해선 기회가 되거나 필요가 느껴지면 공부해서 올려보겠다...!

