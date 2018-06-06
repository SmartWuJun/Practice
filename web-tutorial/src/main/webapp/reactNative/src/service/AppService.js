import {post} from "./rpc"
const xnService={
    login: (data) => {
        data.method = "xntalk.login";
        return post(data)
    },

    /**
     * 获取承租人信息和用户id
     * @param data
     * @returns {*}
     */
    getPassport: (data) => {
        data.method = "api.security.passport.get";
        return post(data)
    },
    /**
     * 获取承租人信息
     * @param data
     * @returns {*}
     */
    getUser: (data) => {
        data.method = "api.master.system.user.get";
        return post(data)
    },

    /**
     * 查询工资条信息
     * @param data
     * @returns {*}
     */
    apiHumanSalaryBillFind: (data) => {
        data.method = "api.human.salaryBill.find";
        return post(data)
    },
    /**
     * 对工资提出异议
     * @param data
     * @returns {*}
     */
    apiHumanSalaryBillRaise: (data) => {
        data.method = "	api.human.salaryBill.find";
        return post(data)
    },
    /**
     * 关闭工资条异议
     * @param data
     * @returns {*}
     */
    apiHumanSalaryBillClose: (data) => {
        data.method = "api.human.salaryBill.close";
        return post(data)
    },
    /**
     * 查询期权授予信息
     * @param data
     * @returns {*}
     */
    apiHumanOptionGrantedFind: (data) => {
        data.method = "api.human.optionGranted.find";
        return post(data)
    },
    /**
     * 查询期权交易信息
     * @param data
     * @returns {*}
     */
    apiHumanStockTransactionFind: (data) => {
        data.method = "api.human.stockTransaction.find";
        return post(data)
    },
    /**
     * 查询可行权数量
     * @param data
     * @returns {*}
     */
    apiHumanOptionGrantedFindCanExercise: (data) => {
        data.method = "api.human.optionGranted.findCanExercise";
        return post(data)
    },
};
export default xnService;