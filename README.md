# To-Do-TypeScript-App

Projekt w pełni działającej aplikacji z zadaniami do zrobienia. Dane przechowywane są na [Firebase](https://firebase.google.com) a cała aplikacja hostowana jest na [Vercelu](https://vercel.com). Link do aplikacji: [To-Do-TypeScript-App](https://to-do-app-chi-eosin.vercel.app)

## Działanie

Cała aplikacja zbudowana jest w technologii SSR(Server Side Rendering) z użyciem TypeScript'a. Każdy użytkownik ma swoje karteczki, po zalogowaniu się z użyciem konta google. Wszystkie karteczki można zakończyć lub usunąć.

## Komponenty

### Login.tsx

plik **Login.tsx** zawiera system logowania.

#### opis 

```
useEffect(() => {
    if(user) {
      //console.log("logged")
      navigate('/Main')
    }
}, [user, navigate])
```

Ma za zadanie sprawdzać czy użytkownik nie jest już zalogowany do aplikacji. ```if(user)``` sprawdza czy istnieje już zalogowany użytkownik. Jeśli istnieje przenosi go do strony głównej. Argumenty ```[user, navigate]``` mają za zadanie użyć hooka przy każdym ręcznym odświeżeniu strony.

```
const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then(() => navigate('/Main'))
    .catch((error) => {
      const errorMessage = error.message;

      console.log(errorMessage)
    });
}
```

Jest funkcją otwierającą popup z logowaniem. Jeśli logowanie powiedzie się, przenosi użytkownika do strony głównej a jeśli nie - wyświetla treść błędu w konsoli.

### Main.tsx

plik **Main.tsx** zawiera system karteczek

#### opis

```
const schema = yup.object().shape({
    description: yup.string().min(1).required("You must add a description")
});

const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
    resolver: yupResolver(schema),
})
```

Zawiera walidację dodawanej karteczki. w zmiennej ```const schema``` znajduje się reguła sprawdzania karteczki. Metoda ```.required()``` nie jest zaimplementowana do dalszego użytku.

### Nav.tsx

plik ***Nav.tsx*** zawiera nawigację.

### Task.tsx

plik ***Task.tsx*** zawiera strukturę karteczek.

```
export type ITask = {
    id: string
    description: string
    completed: boolean
}
```

Jest **Interface'em** odzwierciedlającym strukturę karteczki w bazie danych.

```
type TaskComponent = {
    delete: () => void
    complete: () => void
} & ITask
```

Jest **Typem**(szkieletem) każdej karteczki. Dziedziczy po ***ITask***.

## Konfiguracja

### firebase.ts

Plik **firebase.ts** zawiera wszystkie dane o połączeniu z bazą danych.

```
const firebaseConfig = {
    ...
}
```

Jest obiektem wygenerowanym przez [Firebase](https://firebase.google.com). Zawiera dane o m.in.:
- kluczu
- adresie domeny
- ID projektu

```
const app = initializeApp(firebaseConfig);
```

Inicjalizacja połączenia z bazą danych.

```
export const auth = getAuth(app);
```

Pobranie danych o użytkowniku.

```
export const provider = new GoogleAuthProvider();
```

Pozwala na logowanie się do aplikacji kontem Google.

```
export const db = getFirestore(app);
```

Pobranie bazy danych z bazy danych.

## hooki

### useTasks.tsx

Plik **useTasks.tsx** zawiera wszystkie potrzebne metody i dane do zarządzania karteczkami.

```
export interface CreateFormData {
    description: string
}
```

Interface przechowujący dane wpisywane od użytkownika do karteczki.

```
const [user] = useAuthState(auth);
```

Dane o użytkowniku pobierane przy każdym odświeżeniu strony. Umożliwia to odświeżanie karteczek w ```useEffect```'ie.

```
const tasksRef = collection(db, "todos");
```

Dane o kolekcji _todos_ w bazie danych Firestore.

```
const addTask = async (data: CreateFormData) => {
    ...
}
```

Funkcja do dodawania karteczek i resetowania formularza do wpisywania. Odświeża karteczki wywołując funkcję **getTasks()**.

```
const getTasks = async () => {
    ...
}
```

Funkcja do odświeżania karteczek. Pobiera dane z bazy danych.

```
const removeTask {
    ...
}
```

Funkcja do usuwania karteczek. Odświeża karteczki wywołując funkcję **getTasks()**.

```
const completeTask {
    ...
}
```

Funkcja do kompletowania karteczek. Odświeża karteczki wywołując funkcję **getTasks()**.

## CSS

```
body .shadow {
  --radius: 1000px;
  position: absolute;
  top: 10%;
  left: -20%;
  width: var(--radius);
  height: var(--radius);
  background: radial-gradient(circle, var(--accent-border) 0%, rgba(255,0,111,0) 70%);
  pointer-events: none;
}
```

Jest cieniem na tle aplikacji.

```
.button {
    ...
}
```

posiada **sześć** stany:
- .button (tło w akcentowym kolorze)
- .none (transparentne tło)
- .outline (transparentne tło + obramowanie w akcentowym kolorze)
- .square (transparentne tło + obramowanie w akcentowym kolorze + identyczny padding)
- .remove (transparentne tło + obramowanie w czerwonym kolorze)
- .complete (transparentne tło + obramowanie w zielonym kolorze)