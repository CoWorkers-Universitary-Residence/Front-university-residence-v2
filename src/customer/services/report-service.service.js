import http from '../../core/http-common'

class ReportServiceService {
    endPoint = 'https://go2climbisw22.azurewebsites.net/api/v1/reports';

    create(createReport) {
        return http.post(this.endPoint, createReport);
    }
}

export default new ReportServiceService();
