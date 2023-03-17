import * as React from 'react';

class Footer extends React.Component<FooterProps, FooterState> implements FooterI {
  render(): JSX.Element {
    return (
      <footer className="filter-footer">
        <div>
          &copy; 2010 - 2023
          <a className="filter-footer__link" href="http://www.grindinggear.com/">
            {' '}
            Grinding Gear Games
          </a>
        </div>
        <a
          className="filter-footer__link"
          href="https://ru.pathofexile.com/legal/terms-of-use-and-privacy-policy"
        >
          Условия использования, Уведомление о конфиденциальности и Уведомление в отношении файлов
          Cookies
        </a>
      </footer>
    );
  }
}

export default Footer;
