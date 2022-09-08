



query authorisation 

field update by its name (DB call)

validate  title  ex- (part-1 )  /^[a-zA-Z][-_][0-9]+$/

authentication -- create Blog , get Blog , Update , delete

Authorization -- Update  , Delete



else if(blogId1){
        let blog2 = await blogModel.find(blogId1).select({authorId:1,_id:0});
        console.log(blog2)
         
        if (blog2.length==0) {
            return res.status(404).send("No such blog exists");
        }

        if (element!= id) {
            return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data because it is another user data' })
        }
      }


        //    let blog1 =await blogModel.find(query)
        // 
        next()
