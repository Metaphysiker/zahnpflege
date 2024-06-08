class CheckWXService {
    getMetarReport(functionality, station) {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            headers.append("X-API-Key", process.env.CHECKWX_API_KEY);
            const apiUrl =
                "https://api.checkwx.com/" + functionality + "/" + station + "/decoded";
            fetch(apiUrl, {
                method: "GET",
                headers: headers,
                redirect: "follow",
            })
                .then((response) => {
                    try {
                        response.json().then((data) => {
                            resolve(data)
                        })
                            .catch((error) => {
                                reject(error)
                            })
                    } catch (error) {
                        reject(error)
                    }
                })
                .catch((error) => {
                    reject(error)
                });
        });
    }
}

module.exports = CheckWXService;
