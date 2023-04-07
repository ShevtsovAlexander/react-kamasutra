import React from 'react';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { sendMessageCreator } from '../../redux/dialogs-reducer';

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessageCreator: (newMessageBody) => {
      dispatch(sendMessageCreator(newMessageBody));
    },
  };
};
export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
