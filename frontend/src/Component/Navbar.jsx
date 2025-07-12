
function Navbar(){
    return(
<div class="container"> 
    <header class="nav-bar d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom bg-dark"> 
        <div class="col-md-3 mb-2 mb-md-0"> 
            <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none"> 
            <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Bootstrap" width="40" height="32"></img>
                </a> 
                </div> 
                <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"> 
                    <li><a href="#" class="nav-link px-2 link-secondary">How it works</a>
                    </li> 
                    <li><a href="#" class="nav-link px-2 link-secondary">Engine</a></li> 
                    <li><a href="#" class="nav-link px-2 link-secondary ">Git hub</a></li> 
                    </ul> <div class="col-md-3 text-end "> 
                        <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" width="32" height="30"></img> <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" width="32" height="30"></img>
                        </div> </header> 
                        </div>
)}
export default Navbar;