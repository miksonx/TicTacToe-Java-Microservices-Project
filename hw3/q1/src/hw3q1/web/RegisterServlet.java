package hw3q1.web;

import static hw3q1.Utils.nullOrBlank;
import hw3q1.model.domain.User;
import hw3q1.model.domain.dao.UserDAO;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RegisterServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Check if user already exists
        UserDAO userDAO = (UserDAO) this.getServletContext().getAttribute("userdao");
        User user = new User();
        String email = req.getParameter("email");
        String password = req.getParameter("password");
        String name = req.getParameter("name");
        String streetAddress = req.getParameter("streetaddress");
        String state = req.getParameter("state");
        String zipcode = req.getParameter("zipcode");
        PrintWriter out = resp.getWriter();
        if (nullOrBlank(email) || nullOrBlank(password) || nullOrBlank(name) || nullOrBlank(streetAddress) || nullOrBlank(state) || nullOrBlank(zipcode)) {
            RequestDispatcher dispatcher = req.getRequestDispatcher("register.html");
            dispatcher.forward(req, resp);
            System.out.println("Missing information");
            out.write("Missing Information");
        } else {
            user.setEmail(email);
            user.setPassword(password);
            user.setName(name);
            user.setStreetAddress(streetAddress);
            user.setState(state);
            user.setZipcode(zipcode);

            userDAO.register(user);
            System.out.println("Registered User: " + user);
            out.write("Success");
        }
    }

}
