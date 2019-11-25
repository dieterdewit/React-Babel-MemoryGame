class Honkai extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valkirja: ['Kiana', 'Mei', 'Bronya', 'FuHua', 'HOR', 'Himeko', 'Rita', 'Perry'],
            double_team: [],
            randomCards: [],
            finalCards: [],
            gatchaCards: []
        };
        this.start();
    }

    clicks(gatcha, index) {
        if (this.state.gatchaCards.length == 2) {
            setTimeout(() => {
                this.check();
            }, 666);
        } else {
            let valk = {
                gatcha,
                index };

            let finalCards = this.state.finalCards;
            let valkirja = this.state.gatchaCards;
            finalCards[index].close = false;
            valkirja.push(valk);
            this.setState({
                gatchaCards: valkirja,
                finalCards: finalCards });
          
            if (this.state.gatchaCards.length == 2) {
                setTimeout(() => {
                    this.check();
                }, 666);
            }
        }
    }

    check() {
        let finalCards = this.state.finalCards;
        if (this.state.gatchaCards[0].gatcha == this.state.gatchaCards[1].gatcha && this.state.gatchaCards[0].index != this.state.gatchaCards[1].index) {
            finalCards[this.state.gatchaCards[0].index].complete = true;
            finalCards[this.state.gatchaCards[1].index].complete = true;
        } else {
            finalCards[this.state.gatchaCards[0].index].close = true;
            finalCards[this.state.gatchaCards[1].index].close = true;
        }
        this.setState({
            finalCards,
            gatchaCards: [] });
    }

    start() {
        let finalCards = [];
        this.state.double_team = this.state.valkirja.concat(this.state.valkirja);
        this.state.randomCards = this.shuffle(this.state.double_team);
        this.state.randomCards.map((gatcha) => {
            finalCards.push({
                gatcha,
                close: true,
                complete: false,
                fail: false });
        });
        this.state.finalCards = finalCards;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    render() {
        return (
          React.createElement("div", { className: "honkai" },

          this.state.finalCards.map((valk, index) => {
            return React.createElement(Card, { valk: valk.gatcha, click: () => {this.clicks(valk.gatcha, index);}, close: valk.close, complete: valk.complete });
          })));
    }
}


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    clicked(valk) {
        this.props.click(valk);
    }

    render() {
        return (
            React.createElement("div", { className: "card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : ''), onClick: () => this.clicked(this.props.valk) },

            React.createElement("div", { className: "front" },
            React.createElement("img", { src: "./images/Card.png"})),
  
            React.createElement("div", { className: "back" },
            React.createElement("img", { src: "./images/" + this.props.valk + ".png" }))));
    }
}
  

ReactDOM.render(React.createElement(Honkai, null), document.getElementById('app'));
