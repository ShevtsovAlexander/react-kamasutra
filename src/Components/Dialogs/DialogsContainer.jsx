import React from 'react';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
export default compose(
  connect(mapStateToProps, { updateNewMessageBodyCreator, sendMessageCreator }),
  withAuthRedirect,
)(Dialogs);
