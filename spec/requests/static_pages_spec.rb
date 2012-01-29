require 'spec_helper'

describe "Static pages" do

  let(:base_title) { "Ruby on Rails Tutorial Sample App" }
  
  describe "Home page" do
    it "should have the content 'Sample App'" do
    	visit root_path
    	page.should have_selector('h1', :text=>'Sample App')
    end
    it "should have the right title" do
	  	visit root_path
	  	page.should have_selector('title',
	  			:text => "#{base_title} | Home")
	  end
  end

  describe "Help page" do
  	it "should have the content 'Help'" do
  		visit page_path('help')
  		page.should have_selector('h1', :text=>'Help')
  	end
  	it "should have the right title" do
	  	visit page_path('help')
	  	page.should have_selector('title',
	  			:text => "#{base_title} | Help")
	  end
  end

  describe "About page" do
  	it "should have the content 'About'" do
  		visit page_path('about')
  		page.should have_selector('h1', :text => 'About')
  	end
  	it "should have the right title" do
	  	visit page_path('about')
	  	page.should have_selector('title',
	  			:text => "#{base_title} | About")
	  end
  end

  describe "Contact page" do
    it "should have the h1 'Contact'" do
      visit page_path('contact')
      page.should have_selector('h1', text: 'Contact')
    end

    it "should have the title 'Contact'" do
      visit page_path('contact')
      page.should have_selector('title',
          text: "Ruby on Rails Tutorial Sample App | Contact")
    end
  end
end
