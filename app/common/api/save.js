/**
 * Created by Eswer on 10/7/2015.
 */
import request from 'request-promise';

const utils = {
    /**
     * @param rule
     *
     * @calls action on success or failure
     */
    newrule: (rule) => {
        return request({
            url: SERVER_ADDR + 'api/ruleengine/createnewrule',
            method: 'POST',
            body: rule,
            json: true
        });
    },
    /**
     * @param rule
     *
     * @calls update success or failure
     */
    updaterule: (rule) => {
        let ruledata = rule;
        delete ruledata.updaterule;
        return request({
            url: SERVER_ADDR + 'api/ruleengine/updaterule',
            method: 'POST',
            body: rule,
            json: true
        })
    },
    /**
     *
     * @calls action on success or failure
     */
    getrules: (rule) => {
        return request({
            url: SERVER_ADDR + 'api/ruleengine/getrules',
            method: 'GET',
            body: rule,
            json: true
        });
    }

};

export default utils;
