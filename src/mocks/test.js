module.exports = {
    ['POST /api/test'](req, res) {
        return res.json({
            page: 'b',
            id: 345,
        });
    }
}