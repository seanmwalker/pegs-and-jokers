import PropTypes from 'prop-types';

export function Card(props) {
    return (
        <div onDoubleClick ={() => { props.selectCard(props); }}>
            <div className={'card color-' + props.color}>{props.text}</div>
            <div className="card-text">{props.name}</div>
        </div>
    );
}

Card.defaultProps = {
    selectCard: () => {}
};

Card.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
    selectCard: PropTypes.func,
    text: PropTypes.string
};