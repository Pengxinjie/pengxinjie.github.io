var wb;//读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串
function importExcel(obj, callback) {//导入
    if (!obj.files) {
        return;
    }
    const IMPORTFILE_MAXSIZE = 1 * 1024;//这里可以自定义控制导入文件大小
    var suffix = obj.files[0].name.split(".")[1]
    if (suffix != 'xls' && suffix != 'xlsx') {
        alert('导入的文件格式不正确!')
        return
    }
    if (obj.files[0].size / 1024 > IMPORTFILE_MAXSIZE) {
        alert('导入的表格文件不能大于1M')
        return
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        if (rABS) {
            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        var results = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))
        arrs = json_array(results)
        typeof callback === "function" && callback.call(null, JSON.stringify(arrs))
    };
    if (rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }
}

function initData(callback) {
    let temp = [
        '王灿阳', '郝阔阔', '陈映月', '谢振辉', '林智炜',
        '林浩泉', '缪鑫', '唐翊湘', '蔡依冬', '丁世元',
        '安文杰', '黄蓉', '谢昕翔', '叶鹏辉', '林秉鑫',
        '王伦友', '朱启鑫', '陈家纯', '陈轶群', '潘强钵',
        '刘泽平', '郑冠红', '王健业', '崔灿', '林滢',
        '陈巧蔓', '林清芳', '谢美玲', '刘霁瑶', '李品庚',
        '佟宇琛', '周健', '张玺龙', '罗勋', '吴仪坤',
        '吴汪键', '赖光焕', '马福赢', '王辉', '李雪',
        '高光箭', '林兴邦', '叶航睿',
        '董培磊', '彭鑫杰', '彭馨逸', '谢煜宁', '刘家铭',
        '郭睿', '王小童'
    ]
    typeof callback === "function" && callback.call(null, JSON.stringify(temp))
}

function json_array(data) {
    var arrss = [];
    var data = eval("(" + data + ")");
    for (var i in data) {
        arrss[i] = [];
        arrss[i] = data[i].student;
    }
    return arrss;
}

function fixdata(data) { //文件流转BinaryString
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}