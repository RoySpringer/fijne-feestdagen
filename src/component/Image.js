import React, { Component } from 'react';

export default class Image extends Component {

    constructor(props) {
        super(props);
        this.flyIn = this.props.flyIn || '';
        this.element = null;
        this.tween = null;
        this.prepareAnimation = 'animate';
        this.animateClass = 'animate';
        this.onPageLoad = this.onPageLoad.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.styleTo = this.props.style || {};
        this.state = {
            loaded: false,
            className: this.props.className,
            style: {...this.props.style, opacity: 0}
        }
    }

    /**************************************/
    /* Component lifecicle methods
    /**************************************/
    componentDidMount() {
        window.addEventListener('load', this.onPageLoad);
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
        window.removeEventListener('load', this.onPageLoad);
        this.element.removeEventListener("transitionend", this.onComplete);
    }

    /**************************************/
    /* Eventhandlers
    /**************************************/
    onPageLoad() {
        this.setState({
            loaded: true,
            className: this.state.className + ' ' + this.prepareAnimation,
        })
    }

    onComplete() {
        this.element.removeEventListener("transitionend", this.onComplete);
        if (this.props.onComplete) {
            this.props.onComplete();
        } 
    }

    onLoad() {
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
            style: animPropsFrom,
        })
    }

    /**************************************/
    /* Renderer
    /**************************************/
    render() {
        let { image, alt } = this.props;
        let attributes = {
            src: image.src,
            srcSet: image.srcSet,
            alt
        }
        return (
            <img ref={img => this.element = img} {...attributes} style={this.state.style} className={this.state.className} onLoad={this.onLoad}></img>
        )
    }
}