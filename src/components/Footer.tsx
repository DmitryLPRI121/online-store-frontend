import { Link } from "react-router-dom";
import "./Footer.scss"

const Footer = () => {
    return (
        <div className="Footer">
            <div className="Label">
                <Link to="/Home">
                    <div className="Logo">
                        <img src={require('../images/logo.png')} />
                        <label>Online Store</label>
                    </div>
                </Link>
                <div className="Language">
                    <select>
                        <option value="Russian">Русский</option>
                    </select>
                </div>
            </div>
            <hr />
            <div className="NavContent">
                <div className="Section">
                    <h2>Общее</h2>
                    <Link to="">Главная</Link>
                    <Link to="">Новости</Link>
                    <Link to="">Акции</Link>
                    <Link to="">Отзывы</Link>
                </div>
                <div className="Section">
                    <h2>Каталог</h2>
                    <Link to="">Новинки</Link>
                    <Link to="">Акции</Link>
                    <Link to="">Компьютеры</Link>
                    <Link to="">Комплектующие для ПК</Link>
                    <Link to="">Ноутбуки</Link>
                    <Link to="">Планшеты</Link>
                    <Link to="">Смартфоны</Link>
                    <Link to="">Смарт-часы</Link>
                </div>
                <div className="Section">
                    <h2>О компании</h2>
                    <Link to="">О нас</Link>
                    <Link to="">Наша история</Link>
                    <Link to="">Команда</Link>
                    <Link to="">Вакансии</Link>
                </div>
                <div className="Section">
                    <h2>Поддержка</h2>
                    <Link to="">Часто задаваемые вопросы</Link>
                    <Link to="">Сервисные центры</Link>
                    <Link to="">Инструкции по эксплуатации</Link>
                    <Link to="">Контакты службы поддержки</Link>
                </div>
                <div className="Section">
                    <h2>Контакты</h2>
                    <Link to="">Форма обратной связи</Link>
                    <p>+7 (987) 654 32 10</p>
                    <p>emailexample@email.exmp</p>
                    <p>123456, г. Москва, ул. Тверская, д. 1, Бизнес-центр "Плаза", Офис 101</p>
                </div>
            </div>
            <hr />
            <div className="Other">
                <div className="Agreements">
                    <h2>Соглашения</h2>
                    <Link to="">Политика конфиденциальности</Link>
                    <Link to="">Условия предоставления услуг</Link>
                </div>
                <div className="SocialNetwork">
                    <h2>Мы в соцсетях</h2>
                    <div className="Links">
                        <Link to="">
                            <img src={require('../images/vk.png')} style={{width: '4.5em'}} />
                        </Link>
                        <Link to="">
                            <img src={require('../images/tg.png')} style={{width: '4em'}} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Footer };