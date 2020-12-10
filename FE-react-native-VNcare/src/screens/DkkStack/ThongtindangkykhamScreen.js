import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Modal } from 'react-native'
import { Picker } from '@react-native-community/picker';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { getAllTinh, getCosoyteByTinhId, getKhoaByCosoyteId, getBacSiByKhoaId ,getBenhNhanByBenhnhanId} from '../../services/fetchGET'
import { loaiKham } from '../../services/mockedData'
import { AntDesign } from '@expo/vector-icons';
import Svg, { Line } from 'react-native-svg'
import DateTimePicker from '@react-native-community/datetimepicker';

const ThongtindangkykhamScreen = ({ route, navigation }) => {
    const [dataTinh, setDataTinh] = useState([])
    const [dataCS, setDataCS] = useState([])
    const [dataKhoa, setDataKhoa] = useState([])
    const [dataBS, setDataBS] = useState([])
    const [tinhid, setTinhid] = useState(1)
    const [CSid, setCSid] = useState(1)
    const [khoaid, setKhoaid] = useState(1)
    const [BSid, setBSid] = useState(1)
    const [loaikhamid, setLoaikhamid] = useState(1)
    const [loading, setLoading] = useState(true)
    const [initTinh, setInitTinh] = useState(false)
    const [initCS, setInitCS] = useState(false)
    const [initKhoa, setInitKhoa] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [textLength, setTextLength] = useState();

    const { benhnhanid } = route.params;
    const { loaiquanhe } = route.params;

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(() => {
        getAllTinh()
            .then((json) => setDataTinh(json))
            .finally(() => setLoading(false));
    }, [])

    useEffect(() => {
        getCosoyteByTinhId(tinhid)
            .then((json) => setDataCS(json))
            .finally(() => setLoading(false));
    }, [tinhid])

    useEffect(() => {
        getKhoaByCosoyteId(CSid)
            .then((json) => setDataKhoa(json))
            .finally(() => setLoading(false));
    }, [CSid])

    useEffect(() => {
        getBacSiByKhoaId(khoaid)
            .then((json) => setDataBS(json))
            .finally(() => setLoading(false));
    }, [khoaid])

    const onPressDatLich = () => {
        navigation.navigate('KiemtrathongtinScreen', { date: date, noidungkham: textValue, loaikhamid: loaikhamid, tinhid: tinhid, CSid: CSid, khoaid: khoaid, BSid: BSid, benhnhanid: benhnhanid, loaiquanhe: loaiquanhe })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={loading}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.modalBox}>
                        <View style={styles.modal}>
                            <Text style = {styles.modalText}> đang thực hiện</Text>
                            <ActivityIndicator color='white' />
                        </View>
                    </View>
                </Modal>
                <Text style={styles.headerText}> Chọn cơ cở y tế</Text>
                <Text style={styles.labelText}> Tỉnh/thành phố <Text style={{ color: 'red' }} >*</Text></Text>
                <View style={styles.pickerBox}>
                    <Picker
                        mode="dropdown"
                        selectedValue={tinhid}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            setTinhid(itemValue)
                            setLoading(true)
                            setInitTinh(true)
                        }}
                    >
                        {dataTinh.map((item) => (<Picker.Item key={item.id} label={item.ten} value={item.id} />))}
                    </Picker>
                </View>

                <Text style={styles.labelText}> Chọn Bệnh viện <Text style={{ color: 'red' }} >*</Text></Text>
                <View style={styles.pickerBox}>
                    <Picker
                        mode="dropdown"
                        selectedValue={CSid}
                        style={styles.picker}
                        enabled={initTinh}
                        onValueChange={(itemValue, itemIndex) => {
                            setLoading(true)
                            setCSid(itemValue)
                            setInitCS(true)
                        }}
                    >
                        {initTinh ?
                            dataCS.map((item) => (<Picker.Item key={item.id} label={item.ten} value={item.id} />)) :
                            null}
                    </Picker>
                </View>

                <Text style={styles.labelText}> Chọn Khoa khám bệnh <Text style={{ color: 'red' }} >*</Text></Text>
                <View style={styles.pickerBox}>
                    <Picker
                        mode="dropdown"
                        selectedValue={khoaid}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            setKhoaid(itemValue)
                            setLoading(true)
                        }}>
                        {dataKhoa.map((item) => (<Picker.Item key={item.id} label={item.ten} value={item.id} />))}
                    </Picker>
                </View>

                <Text style={styles.labelText}> Chọn bác sỹ <Text style={{ color: 'red' }} >*</Text></Text>
                <View style={styles.pickerBox}>
                    <Picker
                        mode="dropdown"
                        selectedValue={BSid}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            setBSid(itemValue)
                        }}>
                        {dataBS.map((item) => (<Picker.Item key={item.id} label={item.ten} value={item.id} />))}
                    </Picker>
                </View>

                <Text style={[styles.headerText, { marginTop: 30 }]}> Thông tin hẹn khám</Text>
                <Text style={styles.labelText}> Loại khám bệnh <Text style={{ color: 'red' }} >*</Text></Text>
                <View style={styles.pickerBox}>
                    <Picker
                        mode="dropdown"
                        selectedValue={loaikhamid}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setLoaikhamid(itemValue)}>
                        {loaiKham.map((item) => (<Picker.Item key={item.id} label={item.ten} value={item.id} />))}
                    </Picker>
                </View>
                {show && (
                    <DateTimePicker
                        style={{ color: '#3bccbb' }}
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                <Text style={styles.labelText}> Ngày/giờ đăng ký <Text style={{ color: 'red' }} >*</Text></Text>
                <View style={styles.calendarBox}>
                    <Text> {date.getHours()} giờ {date.getMinutes()} phút - Ngày {date.getDate()} Tháng {date.getMonth() + 1} Năm {date.getFullYear()}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => showTimepicker()}>
                            <AntDesign name="clockcircleo" size={24} color="#3bccbb" />
                        </TouchableOpacity>
                        <Svg height="25" width="20" >
                            <Line x1="10" y1="0" x2="10" y2="25" stroke="black" strokeWidth="1" />
                        </Svg>
                        <TouchableOpacity onPress={() => showDatepicker()}>
                            <AntDesign name="calendar" size={24} color="#3bccbb" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.labelText}> Nội dung khám</Text>
                    <Text style={styles.lengthText}> {textLength}/500</Text>
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        placeholder='Điền nội dung khám ( triệu chứng bệnh, yêu cầu khám ,...)'
                        underlineColorAndroid="transparent"
                        textAlignVertical='top'
                        multiline
                        numberOfLines={10}
                        onChangeText={text => {
                            setTextValue(text)
                            setTextLength(text.length)
                        }}
                        value={textValue}
                    />
                </View>

                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onPressDatLich}
                    >
                        <Text style={styles.buttonText}>
                            ĐẶT LỊCH
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        padding: 10
    },
    modalBox: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    modal: {
        height: 35,
        width: 200,
        padding: 10,
        backgroundColor: "#0183fd",
        borderRadius: 10,
        alignItems: "center",
        flexDirection:'row',
        justifyContent:'space-around',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText:{
        color:'white'
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    labelText: {
        color: 'gray',
        marginTop: 15
    },
    picker: {
        marginTop: 15,
        height: 30,
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    pickerBox: {
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: 'gray'
    },
    calendarBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: 'gray'
    },
    inputBox: {
        marginTop: 20,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10
    },
    lengthText: {
        alignSelf: 'flex-end',
        color: 'gray'
    },
    buttonBox: {
        alignSelf: 'stretch',
        marginTop: 50,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#3bccbb',
        borderRadius: 10,
        borderColor: '#3bccbb',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,

    }
})

export default ThongtindangkykhamScreen