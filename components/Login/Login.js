import React, { PropTypes } from 'react';
import styles from './Style';
import { Image, View } from 'react-native';
import { Root, Container, Spinner, Button, Text, Toast, Icon, Item, Input } from 'native-base';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: false,
            password: false,
            errorUsername: false,
            errorPassword: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            Toast.show({
                text: nextProps.error,
                position: 'bottom',
                buttonText: 'Bỏ qua',
                type: 'warning',
                duration: 10000
            });
            this.props.setLoginError(false);
        }
    }
    componentWillUnmount() {
        //Fetch dữ liệu sau khi đăng nhập.
        this.props.getUserInformation();
        this.props.getCourse();
        this.props.getNotification();
    }
    Login() {
        if (this.state.username && this.state.password) {
            this.setState({ errorUsername: false });
            this.setState({ errorPassword: false });
            this.props.setUsername(this.state.username);
            this.props.setPassword(this.state.password);
            this.props.login('DAA', this.state.username, this.state.password);
        }
        else {
            //Lỗi username
            if (!this.state.username) {
                this.setState({ errorUsername: true });
            }
            //Lỗi password
            if (!this.state.password) {
                this.setState({ errorPassword: true });
            }
        }
    }
    render() {
        return (
            <Container style={{ ...styles.Container, ...styles.HCenter }}>
                <View style={ styles.LogoView }>
                    <Image style={ styles.Logo } source={ require('../../assets/logo.png') }/>
                </View>
                <Item regular label="Username" error={ this.state.errorUsername }>
                    <Icon active name='person'/>
                    <Input placeholder='Mã số sinh viên' onChangeText={ (username) => this.setState({ username }) }/>
                </Item>
                <Item regular label="Password" error={this.state.errorPassword}>
                    <Icon active name='lock'/>
                    <Input placeholder='Mật khẩu chứng thực' secureTextEntry onChangeText={ (password) => this.setState({password}) }/>
                </Item>
                <View style={{ ...styles.Button, ...styles.HCenter }}>
                    <Button title="Đăng nhập" onPress={ this.Login.bind(this) } disabled={(this.props.loading === true) ? true : null}>
                        {(this.props.loading === true) ? <Spinner color='white'/> : null}
                        <Text style={{ textAlign: 'center' }}> Đăng nhập </Text>
                    </Button>
                </View>
            </Container>
        );
    }
}
LoginForm.propsType = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired
};
export default LoginForm;