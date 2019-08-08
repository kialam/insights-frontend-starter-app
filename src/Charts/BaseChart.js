import React from 'react';
import * as d3 from 'd3';

function initializeChart(Chart) {
    return class BaseChart extends React.Component {
        constructor(props) {
            super(props);
            this.getWidth = this.getWidth.bind(this);
            this.getHeight = this.getHeight.bind(this);
        }
        // Methods
        getWidth() {
            let width;
            width =
            parseInt(d3.select('#' + this.props.id).style('width')) -
            this.props.margin.left -
            this.props.margin.right || 700;
            return width;
        }

        getHeight() {
            let height;
            height =
            parseInt(d3.select('#' + this.props.id).style('height')) -
            this.props.margin.top -
            this.props.margin.bottom || 450;
            return height;
        }

        render() {
            return (
                <Chart
                    { ...this.props }
                    getWidth={ this.getWidth }
                    getHeight={ this.getHeight }
                />
            );
        }
    };
}

export default initializeChart;
