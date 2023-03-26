import * as React from 'react';
import { connect } from 'react-redux';
import Filter from '../Filter';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Page extends React.Component<PageProps, PageState> implements PageI {
  render(): JSX.Element {
    return (
      <div className="container">
        <Header />
        <Filter
          translate={this.translate.bind(this)}
          translateOptions={this.translateOptions.bind(this)}
        />
        <Footer translate={this.translate.bind(this)} />
      </div>
    );
  }

  translate(text: string): string {
    const dictionary: object = this.props.lang;
    const result: string = dictionary[text] ? dictionary[text] : text;
    return result;
  }

  translateOptions(options: string[]): object {
    const dictionary: object = this.props.lang;
    const result = {};

    options.forEach((word) => {
      const val: string = dictionary[word] ? dictionary[word] : word;
      result[word] = val;
    });
    return result;
  }
}

const mapStateToProps = (store) => ({
  lang: store.language.lang,
});

export default connect(mapStateToProps)(Page);
