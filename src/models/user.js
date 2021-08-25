export default class User {
   constructor(user) {
      if (user)
      { this.assign(user); }
      else
      { this.clear(); }
      this._user = user;
   }

   restore()
   { this.assign(this._user); }

   assign(user) {
      const {
         id                   = null,
         name                 = null,
         status               = null,
         image_url            = null,   //Url de la imagen almacenada actualmente (Solo al editar se llena este campo)
         original_image_name  = null,  //Nombre original del archivo de imagen almacenado actualmente (Solo al editar se llena este campo)
         image                = null,  //Logo
         role_id              = [],  //Roles
      } = user;

      this.id                   = id;
      this.name                 = name;
      this.status               = status;
      this.image_url            = image_url;
      this.original_image_name  = original_image_name;
      this.image                = image;
      this.role_id              = role_id;
   }

   clear() {
      this.id                    = null;
      this.name                  = null;
      this.status                = null;
      this.image_url             = null;
      this.original_image_name   = null;
      this.image                 = null;
      this.role_id               = [];
   }
}
