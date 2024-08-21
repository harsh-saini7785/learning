export const styles = {
    label: {
        fontSize: '17px',
        fontWeight: 'bold',
    },
    inputField: {
        height: '33px',
        outline: 'none',
        padding: '8px 3px',
        borderRadius: '4px',
        border: 'none',
        width: '100%'
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    gridContainer: {
        // display: 'grid',
        // grid: 'auto / auto auto auto',
        // gridGap: '10px',
        backgroundColor: '#2196F3',
        padding: '10px 20px',
    },

    gridChild: {
        // backgroundColor: 'rgba(255, 255, 255, 0.8)',
        // textAlign: 'center',
        // padding: '20px 0',
        // fontSize: '30px',
    },
    addOption: {
        marginTop: '10px'
    },
    m10: {
        marginTop: '10px'
    },
    requiredField: {
        marginTop: '10px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
    },
    requiredInput: {
        cursor: 'pointer'
    },
    outputField: {
        display: 'flex',
        gap: '10px',
        // alignItems: 'center'
    },
    removeIcon: {
        cursor: 'pointer',
        marginTop: '32px'
    },
    // formPreviewContainer: {
    //     display: 'flex',
    //     justifyContent: 'center'
    // },
    formPreview: {
        backgroundColor: '#9ddbf4',
        // flex: 1,
        padding: '10px 20px',
        width: '500px',
        margin: '10px auto',
        borderRadius: '4px',
        boxShadow: '10px 10px 15px rgba(0, 0, 0, 0.2)',
        maxHeight: '600px',
        overflow: 'auto',
        
    },
    submitButtonContainer: {
        marginTop: '10px',
        display: 'flex',
        gap: '10px'
    },
    grid1: {
        display: 'grid',
        gap: '10px',
        gridTemplateColumns: 'repeat(1, 1fr)',
        marginTop: '10px'
    },
    grid3: {
        display: 'grid',
        gap: '10px',
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
    grid4: {
        display: 'grid',
        gap: '10px',
        gridTemplateColumns: 'repeat(4, 1fr)',
        marginTop: '10px'
    },
    grid2: {
        display: 'grid',
        gap: '10px',
        gridTemplateColumns: 'repeat(2, 1fr)',
        marginTop: '10px'
    },
    w400: {
        width: '400px'
    },
    w350: {
        width: '350px'
    },
    optionForm: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    optionRemove: {
        cursor: 'pointer'
    },
    error: {
        fontSize: '12px',
        color: '#880a0a'
    }
}