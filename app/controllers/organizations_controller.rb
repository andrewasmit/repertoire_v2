class OrganizationsController < ApplicationController
  attr_accessor :org
  before_action :authorize_user_crud, only: [:show, :update, :delete, :concert_programs]

  def create
    org = Organization.create!(organization_params)
    render json: org, status: :created
  end

  def show
    render json: @org, status: :ok, include: [:ensembles, :users]
  end

  def update
    @org.update!(organization_params)
    render json: @org, status: :ok
  end

  def destroy
    @org.destroy
    head :no_content
  end

  def concert_programs
    concert_programs = []
    concerts = @org.concerts

    for concert in concerts
      performances = concert.performances
      concert_program = {
        name: concert.title,
        year: concert.year,
        concert_id: concert.id,
        program: []
      }

      for performance in performances
        piece = Piece.find(performance.piece_id)
        ensemble = Ensemble.find(performance.ensemble_id)
        performed_piece = { 
          performance_id: performance.id,
          piece: piece.title, 
          ensemble: ensemble.name, 
        }  
        
        concert_program[:program] << performed_piece
      end

      concert_programs << concert_program 
    end

    render json: concert_programs, status: :ok
  end


  private
  def organization_params
    params.permit(:name, :id)
  end

  def authorize_user_crud
    @org = Organization.find(params[:id])
    user = User.find(session[:user_id])
    return render json: { error: 'You are not authorized to view or make edits to organizaitons you are not associated with or an Administrator of.' }, status: :unauthorized unless user.organization_id == @org.id && user.is_admin
  end

end
