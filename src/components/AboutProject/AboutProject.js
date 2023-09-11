import './AboutProject.css';

function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__info">
        <div className="about-project__details">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__details">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__duration">
        <div className="about-project__duration-name about-project__duration-name_type_backend">
          1 неделя
        </div>
        <div className="about-project__duration-name about-project__duration-name_type_frontend">
          4 недели
        </div>
        <span className="about-project__duration-description">
          Back-end
        </span>
        <span className="about-project__duration-description">
          Front-end
        </span>
      </div>
    </section>
  );
}

export default AboutProject;