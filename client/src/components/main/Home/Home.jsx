import PresentForm from "../../presents/PresentForm/PresentForm"

export default function Home() {
  return (
    <>
    <h1>Добро пожаловать на сайт подарков Present Simple!</h1>
    <div>
    <h2>Хотите составить список своих желаний подарков?</h2>
     <button>Очень хочу!!!</button>
    </div>
    <div>
    <h2>Выбираете подарок и не знаете, что подарить?</h2>
     <button>Да</button>
    </div>
    <div>
    <h2>Впишите имя и телефон того человека, кому хотите подарить подарок</h2>
    <form>
      <input 
      type="text"
      placeholder="Имя" />
      <input 
      type="text"
      placeholder="Телефон" />
    </form>
    </div>
    {/* <WishListPerson/> */}
    <h2>Мы не нашли его список желаний</h2>
    <h2>Готовы ли Вы отправить ему эту анкету?</h2>
    <div>
    <h2>Ура! Кто-то из твоих близких или знакомых хотят подарить Вам подарок! Заполните, пожалуйста, как можно больше полей</h2>
    <PresentForm/>
    </div>
    </>
  )
}
