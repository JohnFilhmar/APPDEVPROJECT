const Dashboard = () => {
    return (
        <>
        <div className="row">
            <div className="col-sm-12 col-md-6">
                {/* Content for the first column */}
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">Column 1</h5>
                    <p className="card-text">Content goes here.</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-6">
                {/* Content for the second column */}
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">Column 2</h5>
                    <p className="card-text">Content goes here.</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="row mt-3">
            <div className="col-sm-12 col-md-4">
                {/* Content for the third column */}
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">Column 3</h5>
                    <p className="card-text">Content goes here.</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-4">
                {/* Content for the fourth column */}
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">Column 4</h5>
                    <p className="card-text">Content goes here.</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-4">
                {/* Content for the fifth column */}
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">Column 5</h5>
                    <p className="card-text">Content goes here.</p>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}
 
export default Dashboard;