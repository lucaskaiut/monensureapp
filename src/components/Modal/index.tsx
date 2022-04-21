import * as React from 'react';

import { Modal as PaperModal } from 'react-native-paper';

interface Props {
    visible: boolean,
    onDismiss?: (() => void) | undefined
}

const Modal: React.FC<Props> = ({ visible, onDismiss, children }) => {
    return (
        <PaperModal
            onDismiss={onDismiss}
            visible={visible}
            contentContainerStyle={{
                backgroundColor: 'white',
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center'
            }}
            style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            { children }
        </PaperModal>
    );
}

export default Modal;