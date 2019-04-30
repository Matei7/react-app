import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});
class AddPanel extends React.Component {
    constructor(props) {
        super(props);
        console.log('ss');
        this.setState({
            open: true,
        });
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    rand = () => {
        return Math.round(Math.random() * 20) - 10;
    };

    getModalStyle = () => {
        const top = 50 + this.rand();
        const left = 50 + this.rand();

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Typography gutterBottom>Click to get the full Modal experience!</Typography>
                <Button onClick={this.handleOpen}>Open Modal</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={this.getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            Text in a modal
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(AddPanel);