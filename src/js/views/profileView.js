class ProfileView {
  _parentElement = document.querySelector('main');
  renderProfileView() {
    this._generateHTML();
  }
  
  _generateHTML() {
    const html = `
      <section class="profile_container">
        <div class="tab_heading heading">
          <h2>Profile</h2>
        </div>
    
        <div class="user_name_bio_container">
          <div class="user_image_container">
            <img src="src/images/user.png" alt="user profile image">
          </div>
          <div>
            <p class="user_name">Suhail Qureshi</p>
            <p class="user_bio">To never give up...</p>
            </div>
        </div>
    
        <hr>
    
        <div class="user_info_container">
          <h2 class="heading">User Info</h2>
          <div>
            <p>Gender</p>
            <p>Male</p>
          </div>
          <div>
            <p>City</p>
            <p>new Delhi</p>
          </div>
          <div>
            <p>Country</p>
            <p>India</p>
          </div>
          <div>
            <p>Phone Number</p>
            <p>+919643938991</p>
          </div>
          <div>
            <p>Email</p>
            <p class="email">suhuq007@gmail.com</p>
          </div>
        </div>
    
        <hr>
    
        <div class="settings">
          <h2 class="">Settings</h2>
            
          <div>
            <h3>Theme Mode</h3>
            <div>
              <label for="theme">Theme</label>
              <select name="theme" id="theme">
                <option value="system default">system default</option>
                <option value="light">light</option>
                <option value="dark">dark</option>
              </select>
            </div>
          </div>
    
          <div>
            <h3>Chart Settings</h3>
            <div>
              <label for="chart1">Chart 1</label>
              <select name="chart1" id="chart1">
                <option value="line">Line</option>
                <option value="bar">Bar</option>
                <option value="dark">Pie</option>
                <option value="Doughnut">Doughnut</option>
              </select>
            </div>
              
            <div>
              <label for="chart1">Chart 2</label>
              <select name="chart2" id="chart2">
                <option value="line">Line</option>
                <option value="bar">Bar</option>
                <option value="dark">Pie</option>
               <option value="Doughnut">Doughnut</option>
              </select>
            </div>
          </div>
        </div>
    
      </section>`
      
      this._parentElement.insertAdjacentHTML('beforeend', html);
  }
}

export default new ProfileView();
