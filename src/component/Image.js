import React, { Component } from 'react';
import { gsap } from "gsap";

export default class Image extends Component {

    constructor(props) {
        super(props);
        this.flyIn = this.props.flyIn || '';
        this.element = null;
        this.tween = null;
        this.prepareAnimation = 'animate';
        this.animateClass = 'animate';
        this.handlePageLoad = this.handlePageLoad.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.styleTo = this.props.style || {};
        this.state = {
            loaded: false,
            className: this.props.className + ' ' + this.prepareAnimation,
            style: {...this.props.style, opacity: 0}
        }
    }

    componentDidMount() {
        window.addEventListener('load', this.handlePageLoad);
        window.dispatchEvent(new Event('resize'));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loaded === false && this.state.loaded) {
            let style = this.styleTo;
            style.transform += ' translateX(0) translateY(0)';
            this.setState({
                style: style
            });
            this.element.addEventListener("transitionend", this.onComplete, false);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handlePageLoad);
        this.element.removeEventListener("transitionend", this.onComplete, false);
    }

    handlePageLoad() {
        this.setState({
            loaded: true
        })
    }

    onComplete() {
        if (this.props.onComplete) {
            this.props.onComplete();

        }
        
    }

    imageLoaded() {
        let animPropsFrom = {
            ...this.state.style,
        };
        animPropsFrom.transform = 'rotate(40deg)';
        let searchString = this.flyIn.toLowerCase();
        if (searchString.search('top') !== -1) {
            animPropsFrom.transform += " translateY(-500)";
            animPropsFrom.top -= 500;
        } else if (searchString.search('bottom') !== -1) {
            animPropsFrom.transform += " translateY(500)";
            animPropsFrom.top += 500;
        }
        if (searchString.search('left') !== -1) {
            animPropsFrom.left -= 500;
            animPropsFrom.transform += " translateX(-500)";
        } else if (searchString.search('right') !== -1) {
            animPropsFrom.transform += " translateX(500)";
            animPropsFrom.right += 500;
        }

        this.setState({
            style: animPropsFrom
        })
    }

    render() {
        let { src, alt } = this.props;
        let attributes = {
            src, alt
        }
        return (
            <img ref={img => this.element = img} {...attributes} style={this.state.style} className={this.state.className} onLoad={() => this.imageLoaded()}></img>
        )
    }
}