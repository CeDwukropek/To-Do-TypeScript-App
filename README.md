# To-Do-TypeScript-App

Projekt w pełni działającej aplikacji z zadaniami do zrobienia. Dane przechowywane są na [Firebase](https://firebase.google.com) a cała aplikacja hostowana jest na [Vercel](https://vercel.com). Link do aplikacji: [To-Do-TypeScript-App](https://to-do-app-chi-eosin.vercel.app)

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
    await addDoc(tasksRef, {
        ...data,
        completed: false,
        userId: user?.uid,
    })
  
    let form = document.getElementsByTagName("form")[0]
    form.reset()
    getTasks()
}
```

Funkcja do dodawania karteczek i resetowania formularza do wpisywania. Odświeża karteczki wywołując funkcję **getTasks()**.

```
const getTasks = async () => {
    if(user) {
        const q = query(tasksRef, where("userId", "==", user.uid))
        const data = await getDocs(q)
        setTasksList(
        data.docs.map((doc) => ({...doc.data(), id: doc.id})) as ITask[])
    }
    //console.log("refreshed data")
}
```

Funkcja do odświeżania karteczek. Pobiera dane z bazy danych.

```
const removeTask = async (item: ITask) => {
    await deleteDoc(doc(db, "todos", item.id));
    getTasks()
}
```

Funkcja do usuwania karteczek. Odświeża karteczki wywołując funkcję **getTasks()**.

```
const completeTask = async (item: ITask) => {
    await updateDoc(doc(db, "todos", item.id),{
        completed: !item.completed
    })
    getTasks()
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5rem 1rem;
  border-radius: 8px;
  background-color: var(--accent);
  border: 0;
  color: var(--text);
  cursor: pointer;
  transition: 250ms;
}
```

posiada **sześć** stany:
- .button (tło w akcentowym kolorze)
- .none (transparentne tło)
- .outline (transparentne tło + obramowanie w akcentowym kolorze)
- .square (transparentne tło + obramowanie w akcentowym kolorze + identyczny padding)
- .remove (transparentne tło + obramowanie w czerwonym kolorze)
- .complete (transparentne tło + obramowanie w zielonym kolorze)

## To-Do
Pewne rzeczy powinny być jeszcze dodane, jednak nie było czasu na ich dodanie. Nie są one niezbędne dla działania strony ale zdecydowanie poprawią UX.
- [ ] Loading screen on fetching data
- [ ] Automatic refresh on change in DB
- [ ] Promised request (e.g. add task imediatly without waiting for DB response)
- [ ] Themes created by user
- [ ] Settings (font, size, etc.)
