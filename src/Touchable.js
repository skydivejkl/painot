import React from "react";
import simple, {css, View} from "react-simple";

function addTimers() {
    return Component => React.createClass({
        componentWillMount() {
            this.timeouts = [];
        },

        setTimeout(cb, t) {
            this.timeouts.push(setTimeout(cb, t));
        },

        componentWillUnmount() {
            this.timeouts.forEach(clearTimeout);
        },

        render() {
            return <Component {...this.props} setTimeout={this.setTimeout} />;
        },
    });
}

const animation = css.keyframes({
    "0%": {opacity: 0},
    "100%": {opacity: 0.5},
});

const TouchWrap = simple(View, {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#EFEFEF",
    animation: `${animation} 0.5s ease-in`,
    animationFillMode: "forwards",
    animationIterationCount: 1,
});

var Touchable = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        setTimeout: React.PropTypes.func.isRequired,
        disabled: React.PropTypes.bool,
        animateTouch: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {animateTouch: true};
    },

    getInitialState() {
        return {touching: false};
    },

    handleTouchStart() {
        this.setState({touching: true});

        // touch end does not fire always on android. Workaround it.
        this.props.setTimeout(this.handleTouchEnd, 3000);
    },

    handleTouchEnd() {
        this.setState({touching: false});
    },

    render() {
        const {touching} = this.state;
        const {children, animateTouch, setTimeout, ...otherProps} = this.props;
        setTimeout; // eslint-disable-line

        return (
            <View
                {...otherProps}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
            >
                {children}
                {touching && animateTouch && <TouchWrap />}
            </View>
        );
    },
});
Touchable = addTimers()(Touchable);

export default Touchable;
